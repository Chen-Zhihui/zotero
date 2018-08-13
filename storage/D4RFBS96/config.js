
      var SiteConfig = {"environment":"stage","route_url":"http://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World","portal":"https://www.arcgis.com/sharing/rest","billing":"https://billing.arcgis.com/sms/rest","ecas":"https://www.webaccounts.com","ago":"www.arcgis.com","ago_maps":".maps.arcgis.com","destination":"https://developers.arcgis.com","feedback_url":"http://resources.arcgis.com/apps/feedback/dev_feedback.php","diecomm_guid":"29bcd725-4238-4ec6-9618-3d5b69ffce85","diecomm_url":"https://prdapp02.xisecurenet.com/diecomm/Preloader/EN.ashx","marketplace":"http://marketplace.arcgis.com","download_server":"https://downloads.arcgis.com","developers_api":"https://api.developers.arcgis.com","my_esri":"https://my.esri.com"};

      var dojoConfig = {
        async: true,
        locale: 'en-us',
        useDeferredInstrumentation: true,
        packages: [{
          name: "SessionManager",
          location: "/assets/js/legacy/SessionManager"
        },{
          name: "Notifications",
          location: "/assets/js/legacy/Notifications"
        },{
          name: "Config",
          location: "/assets/js/legacy/Config"
        },{
          name: "calcite-web",
          location: "/assets/js",
          main: "calcite-web"
        }]
      };
    