<html>
    <head>
        <title>Familie Vlaar</title>
        
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->    

        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css" />
        <link rel="stylesheet" href="css/ie10mobile.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="lib/durandal/css/durandal.css" />
        <link rel="stylesheet" href="lib/gridmanager/css/jquery.gridmanager.css" />
        <link rel="stylesheet" href="lib/jquery.ui/jquery-ui.css" />
        <link rel="icon" type="image/png" href="img/favicon256.png" />
        
        <script type="text/javascript">
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement("style");
                var mq = "@@-ms-viewport{width:auto!important}";
                msViewportStyle.appendChild(document.createTextNode(mq));
                document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
            }
        </script>
    </head>
    <body>
        <div id="applicationHost">
            <!-- temporary content for when the app is being loaded -->
                <img src="img/spinner.gif" />
                Familievlaar.nl wordt geladen...
        </div>

        <script src="lib/require/require.js" data-main="app/main"></script>
    </body>
</html>
