var phone = {
    messages: {
        en: function en(field, args) {
            return args + '请输入正确的手机号码';
        }
    },
    validate: function validate(value, args) {
        return (/^(1[3-9][0-9]{9})$/.test(value));
    }
};
VeeValidate.Validator.extend('phone', phone);


var productVM = new Vue({
    delimiters: ['${', '}'],
    el: "#product",
    data: {
        product: pData,
        ImgUrl: zgg.Vconfig.ImgUrl,
        adviser: adviser,
        gwPicUrl: zgg.Vconfig.gwPicUrl,
        businessVo: {
            type: pData.pcode == 'ht_tr_ec_1' ? "买" : "卖"
        }
    },
    methods: {
        //买卖按钮提交
        showBusnessDialog: function() {
            //商标无效相关产品
            if (pData.pcode.indexOf('_cm') >= 0) {
                typeof adviser.imtokenId != 'undefined' ? showIm('gw') : showIm('kf');
                return;
            }
            var layer_type = {
                type: 1,
                title: "咨询顾问", //false不显示标题栏,
                // closeBtn: false,是否显示头部删除按钮
                offset: '100px',
                area: '480px;',
                shade: 0.6,
                id: 'LAY_layuipro', //设定一个id，防止重复弹出,
                btn: ['取消', '保存'],
                moveType: 1, //拖拽模式，0或者1,
                content: $("#businessBox"),
                success: function(layero) {
                    //弹框加载成功
                },
                yes: function() {
                    //点击取消事件
                    layer.close(addressOpen);
                },

                btn2: function() {
                    productVM.$validator.validateAll('form-2').then(function(result) {
                        if (result) {
                            axios.post('/product/informGw', productVM.businessVo).then(
                                function(res) {
                                    if (res.data.success) {
                                        layui.use('layer', function() {
                                            layer.msg("提交成功！！！", {
                                                icon: 1
                                            });
                                            layer.close(addressOpen);
                                        })
                                    }
                                }
                            )
                            layer.close(addressOpen);
                        }
                    });
                    return false;
                }
            }
            layui.use('layer', function() {
                addressOpen = layer.open(layer_type);
            })
        }
    }
})