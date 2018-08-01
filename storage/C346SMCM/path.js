field={
        ip:"http://www.datatang.com",
        //ip:"http://localhost:8080/datatang",
        //ip:"file:///F:/projects/src/main/webapp",
        imgIp:"http://www.datatang.com",
        old_datatang:"http://more.datatang.com/"
};
request_url={
	findProductList:field.ip+"/api/product/findProductList",
        movePic:field.ip+"/api/trunMap/findByType",
        findCategoryList:field.ip+"/api/category/findList",
        createOrder:field.ip+"/api/order/createOrder",
        madeServe:field.ip+"/api/product/customdata",
        shopPage:field.ip+"/api/product/search",
        regist:field.ip+"/api/user/mobileExist",
        registBtn:field.ip+"/api/user/regist",
        auth_code:field.ip+"/api/user/sms",
        login:field.ip+"/api/user/login",
        picCaptcha:field.ip+"/api/user/pcrimg",
        hot:field.ip+"/api/product/hot",
        loginOut:field.ip+"/api/user/loginOut",
        detail:field.ip+"/detail/",
        orderInfo:field.ip+"/api/order/orderInfo",
        addOrder:field.ip+"/api/order/addOrder",
        transfer:field.ip+"/getOldTang/",
        cooperation:field.ip+"/api/user/resource",
        findAllList:field.ip+"/product/findAllList",
        findSolutionList:field.ip+"/product/findSolutionList",
        solution:field.ip+"/product/solution/",
        news:field.ip + "/news/list",
        news_html:field.ip + "/news/html/",
        news_con:field.ip + "/news/content/",
        news_img:field.ip + "/img/news/"
};
