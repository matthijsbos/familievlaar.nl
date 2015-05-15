<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <title>@yield('title', 'Familievlaar.nl')</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
    </head>
    <body style="background-color: #dedede;margin: 0;padding: 0;font-family: HelveticaNeue, sans-serif;width: 100% !important;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table" style="table-layout: fixed;background-color: #dedede;" align="center">
            <tbody>
                <tr style="border-collapse: collapse;">
                    <td align="center" bgcolor="#dedede" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                        <table class="w640" style="margin:0 10px;" width="640" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr style="border-collapse: collapse;">
                                    <td class="w640" width="640" height="20" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                    </td>
                                </tr>
                                <tr style="border-collapse: collapse;">
                                    <td id="header" class="w640" width="640" align="center" bgcolor="#EFEFEF" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                        <span style="display:none; visibility: hidden;">@yield('title', 'Familievlaar.nl')</span>
                                        <div align="center" style="text-align: center">
                                            <a href="http://www.familievlaar.nl">
                                            <img width="640" src="<?php echo $message->embed(app_path().'/views/email/img/header.jpg'); ?>" class="w640" border="0" align="top" style="display: inline;outline: none;text-decoration: none;" alt="familievlaar.nl">
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr style="border-collapse: collapse;">
                                    <td class="w640" width="640" height="30" bgcolor="#ffffff" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                    </td>
                                </tr>
                                <tr style="border-collapse: collapse;">
                                    <td class="w640" width="640" bgcolor="#ffffff" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                        <table align="left" class="w640" width="640" cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr style="border-collapse: collapse;">
                                                    <td class="w30" width="30" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                                    </td>
                                                    <td class="w580" width="580" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                                        <table class="w580" width="580" cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr style="border-collapse: collapse;">
                                                                    <td class="w580" width="580" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                                                        <p align="left" class="article-title" style="font-size: 18px;line-height: 24px;color: #4f4f4f;font-weight: bold;margin-top: 0px;margin-bottom: 18px;font-family: HelveticaNeue, sans-serif;">
                                                                            @yield('title', 'Familievlaar.nl')
                                                                        </p>
                                                                        <div align="left" class="article-content" style="font-size: 13px;line-height: 18px;color: #444444;margin-top: 0px;margin-bottom: 18px;font-family: HelveticaNeue, sans-serif;">
                                                                            @yield('content','')
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr style="border-collapse: collapse;">
                                                                    <td class="w580" width="580" height="10" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td class="w30" width="30" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr style="border-collapse: collapse;">
                                    <td class="w640" width="640" height="15" bgcolor="#ffffff" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                    </td>
                                </tr>
                                <tr style="border-collapse: collapse;">
                                    <td class="w640" width="640" height="60" style="font-family: HelveticaNeue, sans-serif;border-collapse: collapse;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
