

// 获取所有订单信息
const getAllOrders_url = "https://porder.shop.jd.com/order/orderlist"

// 获取订单备注信息
const getOrderTag_url = "https://porder.shop.jd.com/order/global/getVenderRemarkMap?orderIds="

// 获取订单图片信息
const getOrderImg_url = "https://porder.shop.jd.com/order/global/getSkuImgs?skuIds="

// 设置订单备注信息
const setOrderTag_url = "https://porder.shop.jd.com/order/global/batchSubmitVenderRemark"



/* 获取订单备注信息 start */

const getOrderList = async (user_cookies, user_ua, odList) => {
    let pd = {
        "current": 1, /* 当前页 */
        "pageSize": 100, /* 每页最大显示100条 */
        "selectedTabName": "allOrders", /* 所有订单 */
        "sortName": "desc" /* 降序显示 */
    }

    let hd = {
        'Content-Type': 'application/json',
        "user_agent": user_ua,
        "cookie": user_cookies
    }

    // 获取最大订单数
    let all_order_num_text = $('.mt10 div').text();
    let totalCount = 0;
    if ( all_order_num_text != undefined){
        totalCount = all_order_num_text.match(/共.*?(\d+)/) != null ? all_order_num_text.match(/共.*?(\d+)/)[1] : 0;
    }
    // 获取最大页码
    let page_num = 0;
    if ( totalCount > 0 && totalCount != undefined){
        // 获取页码
        page_num = parseInt(totalCount / 100)
        if ( totalCount <= 100 ){
            page_num = 1;
        } else {
            let pn = page_num + 1
            page_num = totalCount % 100 == 0 ? page_num : pn;
        }
    }
    

    let order_all = new Array()
    // 开始遍历订单信息
    for ( var i = 0; i < page_num; i++){
        await fetch(getAllOrders_url,{
            method:"POST",
            mode: 'cors',
            headers: hd,
            body:JSON.stringify(pd)
        }).then(response => response.json()).then(json => {
            if (json.orderList != undefined && json.orderList.length > 0){
                for (var i2 = 0; i2 < json.orderList.length; i2++){
                    let oid = json.orderList[i2].orderId;
                    let oname = json.orderList[i2].userPin;
                    for (var i3 = 0; i3 < odList.length; i3++){
                        let ud = odList[i3];
                        // 如果用户数值等于订单号或者用户名
                        if (ud == oid || ud == oname){
                            let inFlag = true;
                            // 遍历看下存储的数据里面有没有，默认展示最近一条数据
                            for (var i4 = 0; i4 < order_all.length; i4++){
                                let oaid = order_all[i4].order;
                                let oaname = order_all[i4].user_name;
                                if(oaid == ud){
                                    inFlag = false;
                                }else{
                                    if (oaname == ud){
                                        inFlag = false;
                                    }
                                }
                            }
                            if (inFlag == true){
                                let pdatas = {"order":undefined, "sku_all": undefined, "venderId":undefined, "tag_flag":undefined, "tag_text":undefined, "user_name":undefined, "complete_time":undefined};
                                let venderId = json.orderList[i2].venderId;
                                let sku_all = new Array()
                                if(json.orderList[i2].orderItems != undefined){
                                    
                                    for(var i = 0; i < json.orderList[i2].orderItems.length; i++){
                                        let sku_dict = {"skuId":undefined, "sku_name":undefined, "sku_img":undefined};
                                        let nowdata = json.orderList[i2].orderItems[i];
                                        let jprice = parseFloat(nowdata.jdPrice);
                                        if (jprice > 0){
                                            if(nowdata.skuId != undefined){
                                                sku_dict['skuId'] = nowdata.skuId
                                            }
                                            if(nowdata.skuName != undefined){
                                                sku_dict['sku_name'] = nowdata.skuName
                                            }
                                            sku_all.push(sku_dict)
                                        }
                                    }
                                }
        
                                let complete_time = json.orderList[i2].orderCompleteTime;
                                pdatas['order'] = oid;
                                pdatas['user_name'] = oname;
                                pdatas['venderId'] = venderId
                                pdatas['sku_all'] = sku_all
                                pdatas['complete_time'] = complete_time
                                order_all.push(pdatas)
                            }
                        }
                    }
                }
            }
        }); 
    }
    
    // 开始获取订单备注信息和图片信息
    if (order_all.length > 0){
        // 订单备注
        // 获取接口params，为订单号集合，以逗号隔开
        let order_id_str_all = '';
        for(var i = 0; i < order_all.length; i++){
            let onow = order_all[i];
            if(onow.order != undefined){
                let ostr = onow.order.toString();
                if(order_id_str_all != ""){
                    order_id_str_all = ostr + "," + order_id_str_all;
                }else{
                    order_id_str_all = ostr;
                }
            }
        }

        // 获取接口数据
        if(order_id_str_all != ""){
            // 获取订单备注信息
            let tagetUrl = getOrderTag_url + order_id_str_all;
            await fetch(tagetUrl,{
                method:"GET",
                mode: 'cors',
                headers: hd
            }).then(response => {
                let data = response.text();
                return data;
            }).then(jsonstr => {
                if(jsonstr.indexOf('orderId') > -1){
                    let json = JSON.parse(jsonstr);
                    for (var i=0; i< order_all.length; i++){
                        let oid = order_all[i].order.toString();
                        for (var key in json){
                            if (key == oid){
                                let flag = json[key].flag != null ? json[key].flag : undefined;
                                let remark = json[key].remark != null ? json[key].remark : undefined;
                                order_all[i]['tag_flag'] = flag;
                                order_all[i]['tag_text'] = remark;
                            }
                        }
                        
                    }
                }
                
            });
            
            // 获取订单图片信息
        }

        // 图片
        let order_img_id_str_all = '';
        for(var i = 0; i < order_all.length; i++){
            if(order_all[i].sku_all.length > 0 ){
                for (var j = 0; j < order_all[i].sku_all.length; j++){
                    let osa = order_all[i].sku_all[j];
                    let osaid = osa.skuId;
                    if(osaid != undefined){
                        if(order_img_id_str_all == ""){
                            order_img_id_str_all = osaid;
                        }else{
                            order_img_id_str_all = osaid + ',' + order_img_id_str_all;
                        }
                    }
                }
            }
        }
        if(order_img_id_str_all != ""){
            let targetUrlimg = getOrderImg_url + order_img_id_str_all;
            await fetch(targetUrlimg,{
                method:"GET",
                mode: 'cors',
                headers: hd
            }).then(response => {
                let data = response.text();
                return data;
            }).then(jsonstr => {

                if(jsonstr.indexOf('jfs') > -1){
                    let json = JSON.parse(jsonstr);
                    for (var i=0; i< order_all.length; i++){
                        if(order_all[i].sku_all.length > 0){
                            for(var j = 0; j<order_all[i].sku_all.length; j++ ){
                                let sid = order_all[i].sku_all[j].skuId.toString();
                                for (var key in json){
                                    if (key == sid){
                                        let iurl = json[key] != null ? json[key] : undefined;
                                        if (iurl != undefined){
                                            order_all[i].sku_all[j]['sku_img']= "https:" + iurl;
                                        }
                                        
                                    }
                                }
                            }
                        }


                        let oid = order_all[i].order.toString();
                        for (var key in json){
                            if (key == oid){
                                let flag = json[key].flag != null ? json[key].flag : undefined;
                                let remark = json[key].remark != null ? json[key].remark : undefined;
                                order_all[i]['tag_flag'] = flag;
                                order_all[i]['tag_text'] = remark;
                            }
                        }
                        
                    }
                }
            });
        }

    } 
    return order_all
}

/* 获取订单备注信息 end */


/* 设置订单备注信息 start */

const odList = [252035707081,250987336561]
const setOrderList = async (user_cookies, user_ua, odList, remark, level, types) => {
    let pd = {
        "level": -1, /* 旗帜等级，-1是保留当前等级，0-5是不同旗帜 */
        "remark":"", /* 要备注的信息 */
        "type": 1, /* 1是追加备注，加在后面 2是覆盖备注，直接覆盖 */
        "orderIds":[] /* 订单号 */
    }
    pd['orderIds'] = odList;
    pd['remark'] = remark;
    pd['level'] = level
    pd['type'] = types

    let hd ={
        'Content-Type': 'application/json',
        "user_agent": user_ua,
        "cookie": user_cookies
    }
    let result =  {"status":"failed", "success":0, "success_orders":[], "failed":odList.length, "failed_orders":odList}
    await fetch(setOrderTag_url,{
        method:"POST",
        mode: 'cors',
        headers: hd,
        body:JSON.stringify(pd)
    }).then(response => {
        let data = response.text();
        return data;
    }).then(jsonstr => {
        let soList = new Array();
        let foList = new Array();
        if(jsonstr.indexOf('orderId') > -1){
            let json = JSON.parse(jsonstr);
            let count = 0;
            for (var i = 0; i< odList.length; i++){
                let oid = odList[i].toString();
                for (var key in json){
                    if (key == oid){
                        let inflag = true;
                        let jtag = json[key].remark;
                        let jflag = json[key].flag;
                        if (jtag.indexOf(pd['remark']) == -1){
                            console.log(jtag, " - ", pd['remark'])
                            inflag = false;
                        }
                        if(pd['level'] != -1){
                            if (pd['level'] != jflag){
                                console.log(jflag, " - ", pd['level'])
                                inflag = false;
                            }
                        }
                        if (inflag == true){
                            count = count + 1
                            soList.push(odList[i])
                        }else{
                            foList.push(odList[i])
                        }
                    }
                }
            }
            let st = "success"
            if (count < odList.length){
                st = "failed"
            }
            let fcount = odList.length - count;
            result = {"status":st, "success":count, "success_orders":soList, "failed":fcount, "failed_orders":foList}
        }
        
    });
    return result
}


/* 设置订单备注信息 end */

export { getOrderList, setOrderList }


