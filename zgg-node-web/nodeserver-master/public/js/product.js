var productVM = new Vue({
    delimiters: ['${', '}'],
    el: "#product",
    data: {
        product: {},
        dPirce: "",
        freeSelected: "",
        minItem: 0, //购买数
        minBuyNum: 0, //最小购买数
        serveexpNum: 0, //服务费均价
        num: 1,
        tempTypeStr: "",
        tempTypeOptionStr: "",
        ImgUrl: zgg.Vconfig.ImgUrl,
        postProduct: [],
        adviser: adviser,
        gwPicUrl: zgg.Vconfig.gwPicUrl
    },
    created: function() {
        var dj, minItem, minBuyNum, serveexpNum;
        pData['feeChargedTypes'].forEach(function(item) {
            //如果有小项计算单间
            if (item.cssId == 3) {
                dj = pData.priceTax / item.feeChargeds[0].freeNum
                minItem = item.feeChargeds[0].freeNum;
                minBuyNum = item.feeChargeds[0].minBuyNum
            }
            item.feeChargeds.forEach(function(fee) {
                fee.isChecked = false
            })
        })
        this.minItem = minItem,
            this.product = pData,
            this.minBuyNum = minBuyNum;
        this.otherPirce = 0; ////计算其他附加项费用总和
        this.dPirce = dj;
        this.serveexpNum = pData.serveexp / minBuyNum; //服务费单项金额

        if(this.product.pcode == "ht_ent_0004"){
            self = this;
            self.product.feeChargedTypes.forEach(function(item) {
                item.feeChargeds[0].isChecked = true;
                self.otherPirce = item.feeChargeds[0].price;
                self.tempTypeStr = item.feeChargeds[0].feeChargedName;
            })
        }
    },
    computed: {
        countPrice: function() {
            if (this.freeSelected == "" || this.freeSelected == 0) {
                this.freeSelected = {};
                this.freeSelected.publicexp = this.freeSelected.serveexp = 0;
            };
            return (((this.product.priceTax - this.product.publicexp) + this.product.publicexp + this.freeSelected.publicexp + this.freeSelected.serveexp));
        },
    },
    methods: {
        /**
         * 小项数据新增修改服务费和官费
         * @param feeChargeds
         * @param type
         */
        editItem: function(feeChargeds, type) {
            if (type == 'add') {
                feeChargeds.freeNum = parseInt(feeChargeds.freeNum) + feeChargeds.stepSize;
                if (parseInt(feeChargeds.freeNum) - parseInt(feeChargeds.minBuyNum) > 0) {
                    this.product.priceTax += (feeChargeds.stepSize) * this.dPirce;
                    this.product.serveexp += (feeChargeds.stepSize) * this.serveexpNum;
                }
            }
            if (type == 'subtract' && (feeChargeds.freeNum - feeChargeds.stepSize) >= feeChargeds.minBuyNum) {
                feeChargeds.freeNum -= feeChargeds.stepSize;
                this.product.priceTax -= (feeChargeds.stepSize) * this.dPirce;
                this.product.serveexp -= (feeChargeds.stepSize) * this.serveexpNum;
            }
            this.minItem = feeChargeds.freeNum;
            this.getCheckedCountPrice();
        },
        /**
         * 设置选中值
         * @param currentItems
         * @param citem
         */
        setChecked: function(currentItems, citem, id) {
            currentItems.forEach(function(item) {
                    if (item.id == citem.id) {
                        item.isChecked = !item.isChecked;
                    } else {
                        item.isChecked = false;
                    }
                })
                // 清除
                /* productVM.product.feeChargedTypes.forEach(function (item) {
                     if(item.bussFlag == 2) {
                         item.feeChargeds.forEach(function(subItem){
                             if(item.id != subItem.id && subItem.isChecked){
                                 subItem.isChecked = false;
                             }
                         });
                     }
                 });

                 currentItems.forEach(function (item) {
                     if(item.id == citem.id){
                         item.isChecked = !item.isChecked;
                     }else{
                         item.isChecked = false;
                     }
                 })*/
                //重新计算官费
            this.getCheckedCountPrice()
        },
        //高新产品 设置选中值
        setHtChecked: function(currentItems, citem, id) {
            currentItems.forEach(function(item) {
                if (item.id == citem.id) {
                    item.isChecked = true;
                } else {
                    item.isChecked = false;
                }
            })
            // 清除
            /* productVM.product.feeChargedTypes.forEach(function (item) {
             if(item.bussFlag == 2) {
             item.feeChargeds.forEach(function(subItem){
             if(item.id != subItem.id && subItem.isChecked){
             subItem.isChecked = false;
             }
             });
             }
             });

             currentItems.forEach(function (item) {
             if(item.id == citem.id){
             item.isChecked = !item.isChecked;
             }else{
             item.isChecked = false;
             }
             })*/
            //重新计算官费
            this.getCheckedCountPrice()
        },
        /**
         *计算平铺类型金额的价格
         */
        getCheckedCountPrice: function() {
            productVM.otherPirce = 0;
            productVM.tempTypeStr = "";
            productVM.product.feeChargedTypes.forEach(function(item) {
                if (item.cssId == 1) {
                    item.feeChargeds.forEach(function(fee) {
                        console.log(item)
                        if (fee.isChecked) {
                            //判断是保险类型
                            productVM.tempTypeStr += fee.feeChargedName + ","
                            if (item.bussFlag == 2) {
                                if ((productVM.minItem - productVM.minBuyNum) > 0) {
                                    productVM.otherPirce = ((fee.price * 10) + ((productVM.minItem - productVM.minBuyNum) * (fee.price / productVM.minBuyNum)) * 10) / 10;
                                } else {
                                    productVM.otherPirce = ((productVM.otherPirce * 10) + (fee.price * 10)) / 10;
                                }
                            } else {
                                productVM.otherPirce += fee.price;
                            }
                        }
                    })
                }
            })
        },
        /**
         * 修改购物车数量
         * @param type 加减
         */
        addNum: function(type) {
            if (type == 'add') {
                if (parseInt($("#cart_nums").text()) + parseInt(productVM.num) >= 200) {
                    layer.msg('购物车最多可添加200件商品！');
                    return false;
                }
                if (!this.checkNumIsMaxNum()) {
                    productVM.num++;
                }
            }
            if (type == 'subtract' && productVM.num > 1) {
                productVM.num--;
            }
        },
        checkNumIsMaxNum: function() {
            if (productVM.num > zgg.Vconfig.maxBuyNum) {
                layer.msg('已超出最大购买数' + zgg.Vconfig.maxBuyNum, {
                    icon: 5,
                    time: 3 * 1000 //6s后自动消失
                })
                return true;
            }
            return false;
        },
        //加入购物车&&立即购买
        addCart: function(url, e,data) {
            //TODO二期加入登录判断
            var isLogin = true;
            if (url == '/cart/add') {
                if (parseInt($("#cart_nums").text()) + parseInt(productVM.num) >= 200) {
                    layer.msg('购物车最多可添加200件商品！');
                    return false;
                }
                $("#cart_nums").text(parseInt($("#cart_nums").text()) + parseInt(productVM.num));
            }
            if (isLogin) {
                //查看当前用户是否有权限购买
                if(data.pcode == "law_leg_0001"){
                    axios.get('/product/getBuyLawProductAuth').then(function (res) {
                        if(res.data.data){
                            axios.post(url, productVM.convertProData()).then(
                                function(res) {
                                    var resJson = res.data;
                                    if (resJson.success && resJson.data) {
                                        if (url.indexOf('buyNow') != -1) {
                                            window.location.href = '/order/buyNow'
                                        } else {
                                            productVM.animateAddCart(e);
                                        }
                                    }
                                },
                                function(err) {
                                    // console.log(err);
                                }
                            )
                            //productVM.btnStates = false;
                        }else{
                            var layer_type = {
                                type: 1,
                                title: "温馨提示",//false不显示标题栏,
                                closeBtn: true,//是否显示头部删除按钮
                                offset: '200px',
                                area: '586px;',
                                closeBtn:0,
                                id: 'LAY_layuipro' ,//设定一个id，防止重复弹出,
                                btn: ['我知道了'],
                                moveType: 1 ,//拖拽模式，0或者1,
                                content: $("#dialogCart"),
                                success: function (layero) {
                                    //弹框加载成功
                                },
                                btn2:function () {
                                    //点击取消事件
                                    layer.close(invoicOpenDialog)
                                },
                                yes:function () {
                                    layer.close(invoicOpenDialog);
                                }
                            };
                            layui.use('layer',function() {
                                invoicOpenDialog = layer.open(layer_type);
                            })

                        }
                    })
                }else{
                    axios.post(url, productVM.convertProData()).then(
                        function(res) {
                            var resJson = res.data;
                            if (resJson.success && resJson.data) {
                                if (url.indexOf('buyNow') != -1) {
                                    window.location.href = '/order/buyNow'
                                } else {
                                    productVM.animateAddCart(e);
                                }
                            }
                        },
                        function(err) {
                            // console.log(err);
                        }
                    )
                }
            }
        },
        animateAddCart: function(e) {
            var event = window.event || e;
            var src = $(this).parents("li").find('.p-img').find("img").attr("src");
            $("#flyItem").find("img").attr("src", src);
            // 滚动大小
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
            eleFlyElement.style.left = event.clientX + scrollLeft + "px";
            eleFlyElement.style.top = event.clientY + scrollTop + "px";
            eleFlyElement.style.visibility = "visible";
            // 需要重定位
            myParabola.position().move();
        },
        //转化购物车接口数据
        convertProData: function() {
            var convertData = {
                priceId: this.product.id,
                pcode: this.product.pcode,
                num: this.num
            }
            if (typeof productVM.product.feeChargedTypes != "undefined") {
                convertData.subProducts = [];
                productVM.product.feeChargedTypes.forEach(function(item) {
                    if (item.cssId == 1) {
                        item.feeChargeds.forEach(function(fee) {
                            if (fee.isChecked) {
                                convertData.subProducts.push({
                                    feeChargedId: fee.id,
                                    feeChargedTypename: item.feeChargedTypename,
                                    buyNum: 1,
                                })
                            }
                        })
                    }
                    if (item.cssId == 2) {
                        item.feeChargeds.forEach(function(fee) {
                            if (fee.id == productVM.freeSelected.id) {
                                convertData.subProducts.push({
                                    feeChargedId: fee.id,
                                    feeChargedTypename: item.feeChargedTypename,
                                    buyNum: 1,
                                })
                            }
                        })
                    }
                    if (item.cssId == 3) {
                        convertData.subProducts.push({
                            feeChargedId: item.feeChargeds[0].id,
                            feeChargedTypename: item.feeChargedTypename,
                            buyNum: productVM.minItem,
                        })
                        convertData.category = productVM.minItem
                    }
                })
            }
            return convertData;
        }
    },
    watch: {
        num: {
            handler: function(newValue, oldValue) {
                if (productVM.checkNumIsMaxNum()) {
                    productVM.num = oldValue;
                }
            }
        }
    }
})
layui.use('form', function() {
    var form = layui.form();
    form.on('select(selected)', function(data) {
        productVM.freeSelected = data.value;
        productVM.tempTypeOptionStr = ""
        productVM.product.feeChargedTypes.forEach(function(item) {
            if (item.cssId == 2) {
                debugger;
                item.feeChargeds.forEach(function(fee) {
                    if (fee.id == data.value) {
                        productVM.freeSelected = fee;
                        productVM.tempTypeOptionStr = fee.feeChargedName;
                    }
                })
            }
        })
    })
});
// 元素以及其他一些变量
var eleFlyElement = document.querySelector("#flyItem"),
    eleShopCart = document.querySelector("#shopCart");
var numberItem = 0;
// 抛物线运动
var myParabola = funParabola(eleFlyElement, eleShopCart, {
    speed: 400, //抛物线速度
    curvature: 0.0008, //控制抛物线弧度
    complete: function() {
        eleFlyElement.style.visibility = "hidden";


    }
});