<!DOCTYPE html>
<html lang="en" manifest="ffos.appcache">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="description" content="Openbeermap, an open map for draft beers">
        <meta name="author" content="@nlehuby">

        <title>OpenBeerMap</title>

        <link rel="localization" href="locales/manifest.json">

        <link rel="stylesheet" href="assets/3rdparty/bootstrap-3.1.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/3rdparty/font-awesome-4.2.0/css/font-awesome.min.css">
        <style>
        /*Fix for Font Awesome ApplicatonManifest offline Cache */
        @font-face {
             font-family: 'FontAwesome';
             src: url('assets/3rdparty/font-awesome-4.2.0/fonts/fontawesome-webfont.eot');
             src: url('assets/3rdparty/font-awesome-4.2.0/fonts/fontawesome-webfont.eot') format('embedded-opentype'),       url('assets/3rdparty/font-awesome-4.2.0/fonts/fontawesome-webfont.woff2') format('woff2'), url('assets/3rdparty/font-awesome-4.2.0/fonts/fontawesome-webfont.woff') format('woff'), url('assets/3rdparty/font-awesome-4.2.0/fonts/fontawesome-webfont.ttf') format('truetype'), url('assets/3rdparty/font-awesome-4.2.0/fonts/fontawesome-webfont.svg') format('svg');
               font-weight: normal;
               font-style: normal;
        }
        </style>
        <link rel="stylesheet" href="assets/3rdparty/leaflet-sidebar/L.Control.Sidebar.css">
        <link rel="stylesheet" href="assets/3rdparty/leaflet-0.7.3/leaflet.css">
        <link rel="stylesheet" href="assets/3rdparty/css/jquery-ui.css">
        <link rel="stylesheet" href="assets/3rdparty/css/leaflet-search.css">
        <link rel="stylesheet" href="assets/3rdparty/css/leaflet-search.mobile.css">
        <link rel="stylesheet" href="assets/3rdparty/leaflet-locate/L.Control.Locate.min.css">
        <link rel="stylesheet" href="assets/css/main.css">
        <link rel="stylesheet" href="assets/css/layers-selector.css">
        <link rel="stylesheet" href="assets/css/setup-modal.css">
        <link rel="stylesheet" href="assets/css/edit-modal.css">

        <link rel="apple-touch-icon" href="assets/img/application/favicon-152.png">
        <link rel="shortcut icon" sizes="196x196" href="assets/img/application/favicon-196.png">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="assets/3rdparty/js/html5shiv.js"></script>
            <script src="assets/3rdparty/js/respond.min.js"></script>
        <![endif]-->
        <script src="assets/3rdparty/js/l20n.min.js"></script>
    </head>
    <body>
        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">OpenBeerMap</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a class="modal-about-toggle" href="#" data-toggle="collapse" data-target=".navbar-collapse.in" data-l10n-id="nav_link_about"><i class="fa fa-fw fa-lg fa-question-circle"></i> About</a></li>
                    <li><a href="https://www.openstreetmap.org/user/OpenBeerMapContributor/diary" target='_blank' data-l10n-id="nav_link_news"><i class="fa fa-fw fa-lg fa-rss"></i> News</a></li>
                    <li class="navbar-pulled">
                      <ul class="nav navbar-nav">
                          <li><a href="#" onclick="social_share('diaspora');"><i class="fa fa-fw fa-lg fa-asterisk"></i></a></li>
                          <li><a href="#" onclick="social_share('twitter');"><i class="fa fa-fw fa-lg fa-twitter"></i></a></li>
                          <li><a href="#" onclick="social_share('facebook');"><i class="fa fa-fw fa-lg fa-facebook"></i></a></li>
                          <li><a href="https://flattr.com/submit/auto?user_id=nlehuby&url=http%3A%2F%2Fopenbeermap.github.io" target="_blank"><img src="assets/img/3rdparties/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0"></a></li>
                      </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div id="map"></div>

        <div id="sidebar">
            <a class="close">&times;</a>
            <h2 data-l10n-id="edit_title">Bar edition</h2>
            <div id="editLoading" data-l10n-id="edit_loading">
                <i class="fa fa-spinner fa-spin"></i> Loading bar information
            </div>
            <form class="form-horizontal" name="editForm" id="editForm">
                <!-- Debug information -->
                <div class="form-group hidden">
                    <input id="editOsmType" name="editOsmType" class="form-control" type="text">
                    <input id="editOsmId" name="editOsmId" class="form-control" type="text">
                </div>
                <!-- Name -->
                <div class="form-group">
                    <label class="col-md-4 control-label" for="editName" data-l10n-id="edit_label_name">Name</label>
                    <div class="col-md-8">
                        <input id="editName" name="editName" class="form-control" type="text">
                    </div>
                </div>
                <!-- Available beers -->
                <div class="form-group">
                    <label class="col-md-4 control-label" data-l10n-id="edit_label_beers">Available beers</label>
                    <div id="editBeersList" class="col-md-8">
                        <div id="editBeersListOSM">
                            <!-- Javascript populated : OSM_js_editor.js -->
                        </div>
                        <div id="editBeersListLocal">
                            <!-- Javascript populated : localStorage.js -->
                        </div>
                        <div id="editBeersListManual">
                            <!-- Manually populated : BeerSearch.js -->
                        </div>
                    </div>
                </div>
                <!-- Add available beer -->
                <div class="form-group">
                    <label class="col-md-4 control-label" for="editAddBeerInput" data-l10n-id="edit_label_add_beer">Add beer</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <input id="editAddBeerInput" name="editAddBeerInput" class="form-control" type="text">
                            <span class="input-group-btn">
                                <button id="editAddBeerButton" class="btn btn-default" type="button"><i class="fa fa-plus"></i></button>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- Wifi  Radios  -->
                <div class="form-group">
                    <label class="col-md-4 control-label" data-l10n-id="edit_label_wifi">Wifi</label>
                    <div class="col-md-8">
                        <div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-default" data-l10n-id="edit_label_wifi_yes">
                                <input name="editWifi" value="yes" type="radio" autocomplete="off"> Yes
                            </label>
                            <label class="btn btn-default" data-l10n-id="edit_label_wifi_no">
                                <input name="editWifi" value="no" type="radio" autocomplete="off"> No
                            </label>
                            <label class="btn btn-default" data-l10n-id="edit_label_wifi_unknown">
                                <input name="editWifi" value="unknown" type="radio"  autocomplete="off"> Unknown
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Opening_hours input-->
                <div class="form-group">
                    <label class="col-md-4 control-label" for="editOpeningHours" data-l10n-id="edit_label_opening_hours">Opening hours</label>
                    <div class="col-md-8">
                        <input id="editOpeningHours" name="editOpeningHours" class="form-control input-md" type="text" disabled>
                    </div>
                </div>

                <!-- Happy_hours input-->
                <div class="form-group">
                    <label class="col-md-4 control-label" for="editHappyHours" data-l10n-id="edit_label_happy_hours">Happy hours</label>
                    <div class="col-md-8">
                        <input id="editHappyHours" name="editHappyHours" class="form-control input-md" type="text" disabled>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="form-group">
                    <div class="col-md-8 col-md-offset-4">
                        <a href="#" class="btn btn-default discard" data-l10n-id="edit_button_discard">Discard</a>
                        <a href="#" id="editButtonSave" class="btn btn-primary" data-l10n-id="edit_button_save">Save</a>
                        <button id="editButtonMore" class="btn btn-default pull-right" type="button" data-l10n-id="edit_button_more"><i class="fa fa-cog"></i> More</button>
                    </div>
                </div>

                <div class="form-group" id="editMoreOptions">
                    <div class="col-md-8 col-md-offset-4">
                        <a id="editOsmLink" href="http://www.openstreetmap.org/" target="_blank" class="btn btn-default btn-block" data-l10n-id="edit_button_osm">Edit via OpenStreetMap</a>
                    </div>
                </div>
            </form>
        </div>

        <!-- Setup Modal -->
        <div class="modal fade" id="modalSetup" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" data-l10n-id="modal_setup_title">Display settings</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-3">
                        <ul class="nav nav-pills nav-stacked" id="SetupTabs">
                            <li class="active"><a href="#modalSetupBeersTab" data-toggle="tab" data-l10n-id="modal_setup_title_beers"><i class="fa fa-beer"></i> Beers</a></li>
                            <li><a href="#modalSetupTileLayerTab" data-toggle="tab" data-l10n-id="modal_setup_title_tilelayer"><i class="fa fa-globe"></i> TileLayer</a></li>
                        </ul>
                    </div>
                    <div class="col-md-9">
                        <div class="tab-content" id="setupTabsContent">
                            <div class="tab-pane fade active in" id="modalSetupBeersTab">
                                <form id="FormSelectedBeers" class="form-group row">
                                    <div class="col-md-6">
                                        <div id="setupFavoritesList"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label" data-l10n-id="modal_setup_label_add">Add favorite beer</label>
                                            <div class="controls">
                                                <div class="input-group">
                                                    <input name="setupAddFavoriteInput" id="setupAddFavoriteInput" class="form-control" type="text">
                                                    <span class="input-group-btn">
                                                        <button id="setupAddFavoriteButton" class="btn btn-primary" type="button"><i class="fa fa-plus"></i></button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group hidden">
                                            <label class="control-label">Associated image (debug)</label>
                                            <div class="controls">
                                                <input type="text" name="beersearchmetadata" id="beersearchmetadata" />
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div class='hidden'> <!-- remove hidden here to debug -->
                                    <span data-l10n-id="setupbeer_resultat">Selected beers: </span>
                                    <span id="ResultLocalStorage"></span>
                                </div>

                                <div class="form-group">
                                    <a href="#" data-dismiss="modal" class="btn btn-primary pull-right" data-l10n-id="modal_setup_button_save">Close</a>
                                    <a href="#" id="setupClearFavorites" class="btn btn-danger" data-l10n-id="modal_setup_button_clear"><i class="fa fa-trash-o"></i> Clear list</a>
                                </div>
                            </div> <!-- end of modalSetupBeersTab -->
                            <div class="tab-pane fade" id="modalSetupTileLayerTab">
                                <ul>
                                    <a href="#" onclick="change_layer(osm_cartodb)"><img src="https://a.basemaps.cartocdn.com/light_all/17/66404/45097.png" alt="Positron" width="80" height="80"></a>
                                    <a href="#" onclick="change_layer(osm_stamen)"><img src="https://stamen-tiles-a.a.ssl.fastly.net/toner/17/66404/45097.png" alt="Stamen" width="80" height="80"></a>
                                </ul>
                                <a href="#" onclick="display_restaurant()" data-l10n-id="modal_setup_display_restaurant">Display restaurants ?</a>
                            </div> <!-- end of modalSetupTileLayerTab -->
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>

        <!-- About modal -->
        <div id="modalAbout" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" data-l10n-id="modal_about_title">Welcome to OpenBeerMap!</h4>
                </div>
                <div class="modal-body">
                <div class="row">
                    <div class="col-md-3">
                        <ul class="nav nav-pills nav-stacked" id="aboutTabs">
                            <li class="active"><a href="#modalAboutTabAbout" data-toggle="tab" data-l10n-id="modal_about_title_about"><i class="fa fa-question-circle"></i> About</a></li>
                            <li><a href="#modalAboutTabContribute" data-toggle="tab" data-l10n-id="modal_about_title_contribute"><i class="fa fa-globe"></i> Contribute</a></li>
                            <li><a href="#modalAboutTabCredits" data-toggle="tab" data-l10n-id="modal_about_title_credits"><i class="fa fa-group"></i> Credits</a></li>
                        </ul>
                    </div>
                    <div class="col-md-9">
                        <div class="tab-content" id="aboutTabsContent">
                        <div class="tab-pane fade active in" id="modalAboutTabAbout" data-l10n-id="modal_about_content_about">
                            <p>This application was built to help people find their favorite beer. If information is missing or erroneous, feel free to contribute by clicking on the <span class="label label-default"><i class="fa fa-edit"></i> Edit bar information</span> button.</p>
                            <p>You will find more information on the genesis of this application in <a href="https://nlehuby.5apps.com/openbeermap-ou-trouver-ma-biere-preferee.html" target="_blank">Noémie Lehuby's blog</a> (in French).</p>
                            <p>You can also contribute by translating or improving this application. You will find more information about that in the <strong>Contribute</strong> tab.</p>
                        </div>

                        <div class="tab-pane fade" id="modalAboutTabContribute">
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-beer"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_content">Add details</h4>
                                    <div data-l10n-id="modal_about_content_content">The simplest way to contribute is to add beers to the bars you know.</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-plus"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_bar">Add a new bar</h4>
                                    <div data-l10n-id="modal_about_content_bar">If a bar is not listed on OpenBeerMap, it must be added directly to OpenStreetMap. <a href="#" id="modalAboutOSMToggle">How?</a></div>
                                    <div id="modalAboutOSM">
                                        <div class="alert alert-info" data-l10n-id="modal_about_content_bar_more">
                                            <p>If a bar does not appear on OpenBeerMap, you can  <a class="alert-link" href="http://osmlab.github.io/osm-note/" target="_blank">file a note</a>. Report as much info as you can so that an OpenStreetMap contributor can add the bar to the map.</p>
                                            <p>If you are an OpenStreetMap contributor, please make sure that the node or the way has one of the following tags:</p>
                                            <ul>
                                                <li><code>amenity = bar</code></li>
                                                <li><code>amenity = biergarten</code></li>
                                                <li><code>amenity = pub</code></li>
                                            </ul>
                                            <p>Restaurants (<code>amenity = restaurant</code>) and the other amenities may also be displayed if they have the <code>brewery = *</code> tag.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-language"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_translate">Translate</h4>
                                    <div data-l10n-id="modal_about_content_translate">Please visit <a href="https://www.openstreetmap.org/user/OpenBeerMapContributor/diary/22349" target="_blank">our diary</a> to learn how to help translate OpenBeerMap.</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-envelope-o"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_suggestions">Make suggestions</h4>
                                    <div data-l10n-id="modal_about_content_suggestions">You can write an e-mail to <strong>openbeermap [at] gmail [dot] com</strong> if you have suggestions.</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-money"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_donate">Donate</h4>
                                    <div><span data-l10n-id="modal_about_content_donate">If you want to pay us a beer</span>:
                                        <form id="modalAboutDonateForm" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                            <input type="hidden" name="cmd" value="_s-xclick">
                                            <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                                            ">
                                            <input type="image" src="assets/img/3rdparties/btn_donate_SM.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">
                                            <img alt="" border="0" src="assets/img/3rdparties/pixel.gif" width="1" height="1">
                                        </form>
                                        <a href="https://flattr.com/submit/auto?user_id=nlehuby&url=http%3A%2F%2Fopenbeermap.github.io" target="_blank"><img src="assets/img/3rdparties/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-code"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_code">Code</h4>
                                    <div data-l10n-id="modal_about_content_code">If you are a Javascript developer or CSS designer, your are very welcome to fork <a href='https://github.com/OpenBeerMap/OpenBeerMap.github.io' target='_blank'>the project</a> on Github.</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-globe"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_moderate">Moderate</h4>
                                    <div data-l10n-id="modal_about_content_moderate">If you are an OpenStreetMap contributor and a beer lover, you are very welcome to help moderating the beers added by the other OpenBeerMap user. Please <a href='https://www.openstreetmap.org/message/new/OpenBeerMapContributor' target='_blank'>contact the team</a>.</div>
                                </div>
                            </div>
                        </div>

                        <div id="modalAboutTabCredits" class="tab-pane fade">
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-globe"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_map">Map</h4>
                                    <div data-l10n-id="modal_about_content_map">Map data by the <a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, tiles courtesy of <a href="http://stamen.com" target="_blank">Stamen</a> / <a href="https://cartodb.com/attributions" target="_blank">CartoDB</a> .</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-database"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_data">Data</h4>
                                    <div data-l10n-id="modal_about_content_data">Bar and beer data by the <a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, via the <a href="http://www.overpass-api.de" target="_blank">OverPass API</a>.</div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <i class="fa fa-group"></i>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading" data-l10n-id="modal_about_category_contributors">Contributors</h4>
                                    <div>
                                        <ul>
                                            <li>Noémie Lehuby</li>
                                            <li>Poilou</li>
                                            <li>Maxime Corteel</li>
                                            <li><a href="https://github.com/OpenBeerMap/OpenBeerMap.github.io/blob/master/contributors.md#contributors" target="_blank" data-l10n-id="modal_about_category_contributors_list">...</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <script src="assets/3rdparty/js/jquery-1.11.0.min.js"></script>
        <script src="assets/3rdparty/js/jquery-ui.min.js"></script>
        <script src="assets/3rdparty/bootstrap-3.1.1/js/bootstrap.min.js"></script>
        <script src="assets/3rdparty/leaflet-0.7.3/leaflet.js"></script>
        <script src="assets/3rdparty/leaflet-sidebar/L.Control.Sidebar.js"></script>
        <script src="assets/3rdparty/OpeningHours/suncalc.js"></script>
        <script src="assets/3rdparty/OpeningHours/opening_hours.js"></script>
        <script src="assets/3rdparty/js/OverPassLayer.js"></script>
        <script src="assets/3rdparty/js/leaflet-search.js"></script>
        <script src="assets/3rdparty/leaflet-hash/leaflet-hash.js"></script>
        <script src="assets/3rdparty/leaflet-locate/L.Control.Locate.min.js"></script>
        <script src="assets/js/utilities.js"></script>
        <script src="assets/3rdparty/osm-js-editor/osmauth.min.js"></script>
        <script src="assets/3rdparty/osm-js-editor/api.js"></script>
        <script src="assets/3rdparty/osm-js-editor/editor.js"></script>
        <script src="assets/js/beer-layer.js"></script>
        <script src="assets/js/local-storage.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="assets/js/search.js"></script>
        <!-- Piwik -->
        <script type="text/javascript">
          var _paq = _paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//piwikobm.zz.mu/";
            _paq.push(['setTrackerUrl', u+'piwik.php']);
            _paq.push(['setSiteId', 2]);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
          })();
        </script>
        <noscript><p><img src="//piwikobm.zz.mu/piwik.php?idsite=2" style="border:0;" alt="" /></p></noscript>
        <!-- End Piwik Code -->
    </body>
</html>
