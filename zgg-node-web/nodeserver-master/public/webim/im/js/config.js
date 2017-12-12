(function() {
    // 配置
    var envir = 'online';
    var configMap = {
        test: {
            appkey: 'fe416640c8e8a72734219e1847ad2547',
            url:'https://apptest.netease.im'
        },
        pre:{
    		appkey: '45c6af3c98409b18a84451215d0bdd6e',
    		url:'http://preapp.netease.im:8184'
        },
        online: {
           appkey: '1f1ccc72c391be4a9d2125be9cf48fb6',//公司应用key
//           appkey: 'e466dbd41d489a3f5410f468136f9e8d',//李辰测试应用key
           url:'https://app.netease.im'
        }
    };
    window.CONFIG = configMap[envir];
}())