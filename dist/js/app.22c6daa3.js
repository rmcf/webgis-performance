(function(e){function t(t){for(var i,r,l=t[0],n=t[1],d=t[2],m=0,u=[];m<l.length;m++)r=l[m],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&u.push(o[r][0]),o[r]=0;for(i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);c&&c(t);while(u.length)u.shift()();return s.push.apply(s,d||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],i=!0,l=1;l<a.length;l++){var n=a[l];0!==o[n]&&(i=!1)}i&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var i={},o={app:0},s=[];function r(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=i,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(a,i,function(t){return e[t]}.bind(null,i));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/webgis-performance/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],n=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var c=n;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0d7c":function(e){e.exports=JSON.parse('[{"id":"ProcessingZones","type":"geojsonurl","layerType":"data","name":"Processing zones","source":"/webgis-performance/geojson/processing_zones.geojson","minZoom":2,"maxZoom":18,"zIndex":"10","orderInList":10,"visibility":false,"style":{"strokeColor":"rgba(102, 187, 106, 0.9)","strokeWidth":1,"fillColor":"transparent"}},{"id":"MSRKaitsepuhver","type":"vectortile","layerType":"data","name":"MSR Kaitsepuhver (Vector Tiles)","source":"https://storage.googleapis.com/geo-assets/pub-tiles/msr_kaitsepuhver_def-8-16/{z}/{x}/{y}.pbf","minZoom":10,"maxZoom":16,"zIndex":"9","orderInList":9,"visibility":false},{"id":"KPOKaitsepuhver","type":"vectortile","layerType":"data","name":"KPO Kaitsepuhver (Vector Tiles)","source":"https://storage.googleapis.com/geo-assets/pub-tiles/kpo_kaitsepuhver_def-8-16/{z}/{x}/{y}.pbf","minZoom":10,"maxZoom":16,"zIndex":"8","orderInList":8,"visibility":false},{"id":"12cdropdenser816","type":"vectortile","layerType":"data","name":"EstSoil-EH 1.2c (Vector Tiles)","source":"https://storage.googleapis.com/geo-assets/pub-tiles/soil_12c_drop_denser-8-16/{z}/{x}/{y}.pbf","minZoom":8,"maxZoom":16,"zIndex":"7","orderInList":7,"labels":false,"visibility":false},{"id":"PRIAPollumassiivid","type":"wms","layerType":"data","name":"PRIA Põllumassiivid","url":"https://kls.pria.ee/geoserver/pria_avalik/ows","layer":"pria_avalik:pria_massiivid","format":"image/png","minZoom":12,"maxZoom":18,"zIndex":"6","orderInList":6,"visibility":false,"styleName":"default","attribution":"&copy; <a href=\'https://www.pria.ee/\'>PRIA</a> | Veebikaardi abitelefon 737 7618 | maa@pria.ee","version":"1.3.0"},{"id":"RiversStreamsDrainage","type":"wms","layerType":"data","name":"Rivers, Streams, Drainage","url":"https://kaart.maaamet.ee/wms/alus?","layer":"kpo_vk2","format":"image/png","projection":"EPSG:3301","minZoom":15,"maxZoom":18,"zIndex":"5","orderInList":5,"visibility":false,"styleName":"default","attribution":"&copy; <a href=\'https://www.maaamet.ee/en\'>Maa-amet / Estonian Land Board</a>","crossOrigin":"anonymous","version":"1.1.1"},{"id":"EstSoilEHVarv","type":"raster","layerType":"data","name":"EstSoil-EH 1.2c Värv (TMS/WMTS)","source":"https://storage.googleapis.com/geo-assets/pub-tiles/soil_12c_varv_rgba_8-16/{z}/{x}/{y}.png","minZoom":8,"maxZoom":16,"zIndex":"3","orderInList":3,"visibility":false},{"id":"EstSoilEHWRB","type":"raster","layerType":"data","name":"EstSoil-EH 1.2c WRB (TMS/WMTS)","source":"https://storage.googleapis.com/geo-assets/pub-tiles/soil_12c_wrbmain_rgba_8-16/{z}/{x}/{y}.png","minZoom":8,"maxZoom":16,"zIndex":"2","orderInList":2,"visibility":false},{"id":"EstSoilSoilTexture","type":"raster","layerType":"data","name":"EstSoil-EH 1.2c USDA texture classes (TMS/WMTS)","source":"https://storage.googleapis.com/geo-assets/pub-tiles/soil_12c_lxtype1_rgba_8-16/{z}/{x}/{y}.png","minZoom":6,"maxZoom":16,"zIndex":"1","orderInList":1,"visibility":false,"legend":[{"id":1,"soilIndex":"S","soilTitle":"Sand","soilColor":"#c40411"},{"id":2,"soilIndex":"LS","soilTitle":"Loamy Sand","soilColor":"#f48600"},{"id":3,"soilIndex":"SL","soilTitle":"Sandy Loam","soilColor":"#f3bb40"},{"id":4,"soilIndex":"L","soilTitle":"Loam","soilColor":"#fff74e"},{"id":5,"soilIndex":"SiL","soilTitle":"Silt Loam","soilColor":"#51d6b1"},{"id":6,"soilIndex":"SiCL","soilTitle":"Silty Clay Loam","soilColor":"#30afd2"},{"id":7,"soilIndex":"CL","soilTitle":"Clay Loam","soilColor":"#2b9ba2"},{"id":8,"soilIndex":"C","soilTitle":"Clay","soilColor":"#3b7be9"},{"id":9,"soilIndex":"HC","soilTitle":"Heavy Clay","soilColor":"#2b57ba"},{"id":10,"soilIndex":"PEAT","soilTitle":"Peatlands or highly organic soils","soilColor":"#704701"},{"id":11,"soilIndex":"GRAVELS","soilTitle":"Gravels or mainly rocky soils","soilColor":"#8ca4ad"},{"id":12,"soilIndex":"none","soilTitle":"no texture information","soilColor":"#ffffff"}],"attribution":"&copy; <a href=\'https://landscape-geoinformatics.ut.ee\'>Landscape Geoinformatics</a>"},{"id":"MAALUSHalduspiirid","type":"wms","layerType":"base","name":"MA-ALUS: Halduspiirid","url":"https://kaart.maaamet.ee/wms/alus?","layer":"Halduspiirid","format":"image/png","projection":"EPSG:3301","minZoom":7,"maxZoom":18,"zIndex":"0","orderInList":90,"visibility":false,"styleName":"default","attribution":"&copy; <a href=\'https://www.maaamet.ee/en\'>Maa-amet / Estonian Land Board</a>","crossOrigin":"null","version":"1.1.1"},{"id":"MAALUSPohikaart","type":"wms","layerType":"base","name":"MA-ALUS: Põhikaart","url":"https://kaart.maaamet.ee/wms/alus?","layer":"pohi_vr2","format":"image/png","projection":"EPSG:3301","minZoom":14,"maxZoom":18,"zIndex":"0","orderInList":80,"visibility":false,"styleName":"default","attribution":"&copy; <a href=\'https://www.maaamet.ee/en\'>Maa-amet / Estonian Land Board</a>","crossOrigin":"null","version":"1.1.1"},{"id":"MAFOTOKAARTReljeefvarjutus","type":"wms","layerType":"base","name":"MA-FOTOKAART: Reljeefvarjutus","url":"https://kaart.maaamet.ee/wms/fotokaart?","layer":"vreljeef","format":"image/jpeg","projection":"EPSG:3301","minZoom":7,"maxZoom":18,"zIndex":"0","orderInList":70,"visibility":false,"styleName":"default","attribution":"&copy; <a href=\'https://www.maaamet.ee/en\'>Maa-amet / Estonian Land Board</a>","crossOrigin":"null","version":"1.1.1"},{"id":"MAFOTOKAARTOrtofoto","type":"wms","layerType":"base","name":"MA-FOTOKAART: Ortofoto","url":"https://kaart.maaamet.ee/wms/fotokaart?","layer":"EESTIFOTO","format":"image/jpeg","projection":"EPSG:3301","minZoom":7,"maxZoom":18,"zIndex":"0","orderInList":60,"visibility":false,"styleName":"default","attribution":"&copy; <a href=\'https://www.maaamet.ee/en\'>Maa-amet / Estonian Land Board</a>","crossOrigin":"null","version":"1.1.1"},{"id":"OpenStreetMap","type":"raster","layerType":"base","name":"Open Street Map","source":"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png","minZoom":2,"maxZoom":18,"zIndex":"0","orderInList":50,"visibility":true,"attribution":"&copy; <a href=\'https://www.openstreetmap.org/copyright\'>OpenStreetMap</a> contributors"},{"id":"ESRIWorldTopoMap","type":"raster","layerType":"base","name":"ESRI World Topo Map","source":"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png","minZoom":2,"maxZoom":18,"zIndex":"0","orderInList":40,"visibility":false,"attribution":"Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"},{"id":"ESRIWorldImagery","type":"raster","layerType":"base","name":"ESRI World Imagery","source":"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png","minZoom":2,"maxZoom":17,"zIndex":"0","orderInList":30,"visibility":false,"attribution":"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"},{"id":"BlueMarble","type":"wms","layerType":"base","name":"Blue Marble by EOX","url":"https://tiles.maps.eox.at/wms?","layer":"bluemarble","format":"image/jpeg","projection":"EPSG:4326","minZoom":2,"maxZoom":10,"zIndex":"0","orderInList":20,"visibility":false,"styleName":"default","attribution":"<a href=\'https://s2maps.eu/\'>Sentinel-2 cloudless - https://s2maps.eu</a> by <a href=\'https://eox.at/\'>EOX IT Services GmbH</a> (Contains modified Copernicus Sentinel data 2019)","crossOrigin":"anonymous","version":"1.1.1"},{"id":"SentinelCloudlessLayer","type":"wms","layerType":"base","name":"Sentinel-2 cloudless layer for 2019 by EOX","url":"https://tiles.maps.eox.at/wms?","layer":"s2cloudless-2019","format":"image/jpeg","projection":"EPSG:4326","minZoom":2,"maxZoom":14,"zIndex":"0","orderInList":10,"visibility":false,"styleName":"default","attribution":"<a href=\'https://s2maps.eu/\'>Sentinel-2 cloudless - https://s2maps.eu</a> by <a href=\'https://eox.at/\'>EOX IT Services GmbH</a> (Contains modified Copernicus Sentinel data 2019)","crossOrigin":"anonymous","version":"1.1.1"}]')},"0f39":function(e,t,a){"use strict";var i=a("8305"),o=a.n(i);o.a},"452c":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),o=a("9c30"),s=(a("51de"),a("e094"),a("1cf8")),r=(a("2b69"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("link",{attrs:{rel:"stylesheet",href:"//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"}}),a("md-toolbar",[a("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.menuVisible=!e.menuVisible}}},[a("md-icon",[e._v("menu")]),a("md-tooltip",{staticClass:"md-xsmall-hide md-small-hide",attrs:{"md-direction":"bottom"}},[e._v("Layers navigation")])],1),a("span",{staticClass:"md-title"},[e._v("Web GIS")]),a("div",{staticClass:"md-toolbar-section-end"},[a("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.aboutProject=!e.aboutProject}}},[a("md-icon",[e._v("info_outline")]),a("md-tooltip",{staticClass:"md-xsmall-hide md-small-hide",attrs:{"md-direction":"bottom"}},[e._v("About project")])],1)],1)],1),a("md-drawer",{attrs:{"md-active":e.menuVisible},on:{"update:mdActive":function(t){e.menuVisible=t},"update:md-active":function(t){e.menuVisible=t}}},[a("div",{staticClass:"manage"},[a("div",{staticClass:"layers-group"},[a("div",{staticClass:"md-layout md-alignment-center-center"},[a("div",{staticClass:"layers-title"},[a("md-icon",[e._v("layers")]),e._v(" Navigation")],1)])]),a("div",{staticClass:"drawer-layers-section"},[a("div",{staticClass:"md-layout md-alignment-top-right"},[a("div",{staticClass:"drawer-layers-section_subtitle"},[e._v("data layers")])]),e._l(e.sortedDataLayerListComputed,(function(t){return a("div",{key:t.id,staticClass:"drawer-layer"},[a("div",[a("md-checkbox",{staticClass:"md-primary",model:{value:t.visibility,callback:function(a){e.$set(t,"visibility",a)},expression:"layer.visibility"}},[e._v(e._s(t.name)),a("span",{staticClass:"drawer-layer__zoom"},[t.minZoom>e.mapZoomDefault||t.maxZoom<e.mapZoomDefault?a("span",{staticClass:"accent-color"},[e._v(" ("),a("md-icon",{staticClass:"drawer-layer__zoom_icon-red"},[e._v("crop_free")]),e._v(e._s(t.minZoom)+"-"+e._s(t.maxZoom)+") "),a("md-tooltip",{attrs:{"md-direction":"top"}},[e._v("available at zoom level "+e._s(t.minZoom)+"-"+e._s(t.maxZoom))])],1):a("span",[e._v(" ("),a("md-icon",{staticClass:"drawer-layer__zoom_icon"},[e._v("crop_free")]),e._v(e._s(t.minZoom)+"-"+e._s(t.maxZoom)+") "),a("md-tooltip",{attrs:{"md-direction":"top"}},[e._v("available at zoom level "+e._s(t.minZoom)+"-"+e._s(t.maxZoom))])],1)])])],1),t.visibility?a("div",{staticClass:"layer-info-region"},[a("div",{staticClass:"layer-info-region_zindex"},[a("md-button",{staticClass:"md-icon-button md-dense md-primary",on:{click:function(e){t.zIndex=parseInt(t.zIndex)+1}}},[a("md-icon",[e._v("keyboard_arrow_up")])],1),a("md-button",{staticClass:"md-icon-button md-dense md-primary",on:{click:function(e){t.zIndex=parseInt(t.zIndex)-1}}},[a("md-icon",[e._v("keyboard_arrow_down")])],1),a("md-button",{staticClass:"md-dense md-primary"},[e._v("z-index: "+e._s(t.zIndex))])],1),void 0!==t.labels?a("div",{staticClass:"layer-labels"},[a("div",{staticClass:"input"},[a("label",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.labels,expression:"layer.labels"}],attrs:{type:"checkbox","true-value":!0,"false-value":!1},domProps:{value:!0,checked:Array.isArray(t.labels)?e._i(t.labels,!0)>-1:t.labels},on:{change:function(a){var i=t.labels,o=a.target,s=!!o.checked;if(Array.isArray(i)){var r=!0,l=e._i(i,r);o.checked?l<0&&e.$set(t,"labels",i.concat([r])):l>-1&&e.$set(t,"labels",i.slice(0,l).concat(i.slice(l+1)))}else e.$set(t,"labels",s)}}}),e._v(" labels")])])]):e._e(),t.legend?a("div",{staticClass:"layer-legend"},[a("table",{staticClass:"layer-legend__table"},e._l(t.legend,(function(t){return a("tr",{key:t.id},[a("td",[a("div",{staticClass:"layer-legend__table-color",style:{"background-color":t.soilColor}})]),a("td",[a("div",{staticClass:"layer-legend__table-index"},[e._v(" "+e._s(t.soilIndex)+" ")])]),a("td",[a("div",{staticClass:"layer-legend__table-title"},[e._v(" "+e._s(t.soilTitle)+" ")])])])})),0)]):e._e()]):e._e()])}))],2),a("div",{staticClass:"drawer-layers-section"},[a("div",{staticClass:"md-layout md-alignment-top-right"},[a("div",{staticClass:"drawer-layers-section_subtitle"},[e._v("base layers")])]),e._l(e.sortedBaseLayerListComputed,(function(t){return a("div",{key:t.id,staticClass:"drawer-layer"},[a("div",[a("md-radio",{staticClass:"md-primary",attrs:{value:t},model:{value:e.baseLayerSelected,callback:function(t){e.baseLayerSelected=t},expression:"baseLayerSelected"}},[e._v(e._s(t.name)+" "),a("span",{staticClass:"drawer-layer__zoom"},[t.minZoom>e.mapZoomDefault||t.maxZoom<e.mapZoomDefault?a("span",{staticClass:"accent-color"},[e._v(" ("),a("md-icon",{staticClass:"drawer-layer__zoom_icon-red"},[e._v("crop_free")]),e._v(e._s(t.minZoom)+"-"+e._s(t.maxZoom)+") "),a("md-tooltip",{attrs:{"md-direction":"top"}},[e._v("available at zoom level "+e._s(t.minZoom)+"-"+e._s(t.maxZoom))])],1):a("span",[e._v(" ("),a("md-icon",{staticClass:"drawer-layer__zoom_icon"},[e._v("crop_free")]),e._v(e._s(t.minZoom)+"-"+e._s(t.maxZoom)+") "),a("md-tooltip",{attrs:{"md-direction":"top"}},[e._v("available at zoom level "+e._s(t.minZoom)+"-"+e._s(t.maxZoom))])],1)])])],1)])}))],2)])]),a("div",{staticClass:"container"},[a("transition",{attrs:{name:"fade"}},[e.aboutProject?a("About",{on:{"close-about":function(t){e.aboutProject=!1}}}):e._e()],1),a("Map",{attrs:{selectedLayersProp:e.activeLayerListComputed,mapZoomProp:e.mapZoomDefault,mapCenterProp:e.mapCenterDefault},on:{"update-zoom":function(t){e.mapZoomDefault=t},"update-minzoom":function(t){e.mapMinZoomDefault=t},"update-center":function(t){e.mapCenterDefault=t},"remove-maplayers":function(t){return e.cleanMap()},"default-mapzoom":function(t){return e.defaultMapZoom()}}})],1)],1)}),l=[],n=(a("4de4"),a("4160"),a("159b"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"map-component"},[a("link",{attrs:{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"}}),a("div",{directives:[{name:"show",rawName:"v-show",value:e.dataLoadingStatus,expression:"dataLoadingStatus"}],staticClass:"md-layout md-alignment-center-center"},[a("div",{staticClass:"md-layout-item md-size-100"},[a("div",{staticClass:"md-layout md-alignment-center-center loading-block"},[a("md-progress-spinner",{staticClass:"md-accent",attrs:{"md-diameter":100,"md-stroke":3,"md-mode":"indeterminate"}})],1)]),e._m(0)]),a("div",[a("md-dialog-alert",{attrs:{"md-active":e.geoJsonUrlAlert,"md-title":e.geoJSONserviceLayerComputed.name,"md-content":"click on map and wait until vector objects are loaded"},on:{"update:mdActive":function(t){e.geoJsonUrlAlert=t},"update:md-active":function(t){e.geoJsonUrlAlert=t}}})],1),a("transition",{attrs:{name:"fade"}},[e.dataLoadingStatus?e._e():a("div",[a("div",{staticClass:"map-info"},[a("transition-group",{attrs:{name:"fade"}},[e.selectedVectorTileFeature?a("div",{key:"tableVectorTiles"},[this.selectedVectorTileFeature&&"msr_kaitsepuhver"==this.selectedVectorTileFeature.properties_.layer?a("div",{staticClass:"map-info_layer-name"},[a("span",[e._v("Layer: ")]),e._v("MSR Kaitsepuhver (Vector Tiles) ")]):e._e(),this.selectedVectorTileFeature&&"kpo_kaitsepuhver"==this.selectedVectorTileFeature.properties_.layer?a("div",{staticClass:"map-info_layer-name"},[a("span",[e._v("Layer: ")]),e._v("KPO Kaitsepuhver (Vector Tiles) ")]):e._e(),this.selectedVectorTileFeature&&"soil_12c_all"==this.selectedVectorTileFeature.properties_.layer?a("div",{staticClass:"map-info_layer-name"},[a("span",[e._v("Layer: ")]),e._v("EstSoil-EH 1.2c (Vector Tiles) ")]):e._e(),a("div"),a("div"),a("md-table",[a("md-table-row",e._l(this.selectedVectorTileFeature.properties_,(function(t,i){return a("md-table-head",{key:i},[e._v(e._s(i))])})),1),a("md-table-row",e._l(this.selectedVectorTileFeature.properties_,(function(t,i){return a("md-table-cell",{key:i},[e._v(e._s(t)+" ")])})),1)],1),a("div",{staticClass:"object-align-right"},[a("div",{staticClass:"object-item"},[a("md-button",{staticClass:"md-dense md-raised md-accent",on:{click:function(t){e.selectedVectorTileFeature=!1}}},[a("md-icon",[e._v("cancel")]),e._v(" REMOVE "),a("md-tooltip",{attrs:{"md-direction":"bottom"}},[e._v("Remove selected feature")])],1)],1)])],1):e._e(),this.geoJSONdata.length>0&&this.geoJSONserviceLayerComputed?a("div",{key:"table"},[a("md-table",[a("md-table-row",e._l(this.geoJSONdataSingleFeature.properties,(function(t,i){return a("md-table-head",{key:i},[e._v(e._s(i))])})),1),e._l(this.geoJSONdata,(function(t){return a("md-table-row",{key:t.id},e._l(t.properties,(function(t,i){return a("md-table-cell",{key:i},[e._v(e._s(t)+" ")])})),1)}))],2),a("div",{staticClass:"object-align-right"},[a("div",{staticClass:"object-item"},[a("md-button",{staticClass:"md-dense md-raised md-primary",on:{click:function(t){return e.fitSelectedJSONfeatures()}}},[a("md-icon",[e._v("filter_center_focus")]),e._v(" ZOOM "),a("md-tooltip",{attrs:{"md-direction":"bottom"}},[e._v("Zoom to selected features")])],1),a("md-button",{staticClass:"md-dense md-raised md-accent",on:{click:function(t){return e.resetGeoJSONdata()}}},[a("md-icon",[e._v("cancel")]),e._v(" REMOVE "),a("md-tooltip",{attrs:{"md-direction":"bottom"}},[e._v("Remove selected features")])],1)],1)])],1):e._e(),0===this.geoJSONdata.length&&this.geoJSONserviceLayerComputed&&1==this.clickOnMapDetection&&!0!==this.geoJSONdataSourceError?a("div",{key:"noobjects",staticClass:"md-layout md-alignment-top-center informer"},[a("div",{staticClass:"md-layout-item md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100"},[a("md-card",[a("md-card-header",[a("div",{staticClass:"md-title"},[e._v("Nothing found")])]),a("md-card-content",[e._v(" Unfortunately, no objects were found in that location, please try another one... ")]),a("md-card-actions",[a("md-button",{staticClass:"md-accent",on:{click:function(t){e.clickOnMapDetection=!1}}},[a("md-icon",[e._v("cancel")]),e._v(" CLOSE")],1)],1)],1)],1)]):e._e(),this.geoJSONdataSourceError?a("div",{key:"error",staticClass:"md-layout md-alignment-top-center informer"},[a("div",{staticClass:"md-layout-item md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100"},[a("md-card",[a("md-card-header",[a("div",{staticClass:"md-title"},[e._v("Source error")])]),a("md-card-content",[e._v(" "+e._s(e.geoJSONdataSourceErrorText)+" ")]),a("md-card-actions",[a("md-button",{staticClass:"md-accent",on:{click:function(t){e.geoJSONdataSourceError=!1}}},[a("md-icon",[e._v("cancel")]),e._v(" CLOSE")],1)],1)],1)],1)]):e._e()])],1)])]),a("div",{staticClass:"map-image"},[a("div",{staticClass:"map-informer"},[a("md-button",{staticClass:"md-icon-button md-raised button-margin",on:{click:e.removeLayersInMap}},[a("md-icon",[e._v("layers_clear")]),a("md-tooltip",{staticClass:"md-xsmall-hide md-small-hide",attrs:{"md-direction":"bottom"}},[e._v("Remove all layers")])],1),a("md-badge",{staticClass:"button-margin md-primary",attrs:{"md-content":e.zoomComputed}},[a("md-button",{staticClass:"md-raised md-icon-button",on:{click:function(t){return e.setDefaultMapZoom()}}},[a("md-icon",[e._v("crop_free")]),a("md-tooltip",{staticClass:"md-xsmall-hide md-small-hide",attrs:{"md-direction":"bottom"}},[e._v("Default map zoom")])],1)],1)],1),a("vl-map",{ref:"map",attrs:{"data-projection":e.projComputed,"load-tiles-while-animating":!0,"load-tiles-while-interacting":!0},on:{click:function(t){return e.spatialQueryOnClick(t)}}},[a("vl-view",{ref:"view",attrs:{zoom:e.zoomComputed,center:e.centerComputed,"min-zoom":2,"max-zoom":18},on:{"update:zoom":[function(t){e.zoomComputed=t},function(t){return e.$emit("update-zoom",e.dataZoom)}],"update:center":[function(t){e.centerComputed=t},function(t){return e.$emit("update-center",e.dataCenter)}]}}),e._l(e.selectedLayersComputed,(function(t){return["geojsonurl"===t.type?a("vl-layer-vector",{key:t.id,attrs:{"z-index":parseInt(t.zIndex),"render-mode":"image"}},[a("vl-source-vector",{attrs:{url:t.source}}),"ProcessingZones"===t.id?a("vl-style-func",{attrs:{factory:e.ProcessingZonesStyles}}):e._e(),"LandboardDEMGrids"===t.id?a("vl-style-func",{attrs:{factory:e.LandboardDEMGridsStyles}}):e._e()],1):e._e()]})),e.geoJSONserviceLayerComputed?a("vl-layer-vector",{attrs:{"z-index":parseInt(e.geoJSONserviceLayerComputed.zIndex),"render-mode":"image"}},[a("vl-source-vector",{ref:"geoJsonServicesSource",attrs:{features:e.geoJSONdata},on:{"update:features":function(t){e.geoJSONdata=t}}}),a("vl-style-box",[a("vl-style-stroke",{attrs:{color:e.geoJSONserviceLayerComputed.style.strokeColor,width:e.geoJSONserviceLayerComputed.style.strokeWidth}}),a("vl-style-fill",{attrs:{color:e.geoJSONserviceLayerComputed.style.fillColor}})],1)],1):e._e(),e._l(e.selectedLayersComputed,(function(t){return["vectortile"===t.type?a("vl-layer-vector-tile",{key:t.id,attrs:{"z-index":parseInt(t.zIndex)}},[a("vl-source-vector-tile",{attrs:{url:t.source}}),"12cdropdenser816"===t.id&&!1===t.labels?a("vl-style-func",{attrs:{factory:e.EstSoilMapVectorTilesStyle}}):e._e(),"12cdropdenser816"===t.id&&!0===t.labels?a("vl-style-func",{attrs:{factory:e.EstSoilMapVectorTilesStyleExperimental}}):e._e(),"KPOKaitsepuhver"===t.id?a("vl-style-func",{attrs:{factory:e.KPOKaitsepuhverVectorTilesStyle}}):e._e(),"MSRKaitsepuhver"===t.id?a("vl-style-func",{attrs:{factory:e.MSRKaitsepuhverVectorTilesStyle}}):e._e()],1):e._e()]})),e._l(e.selectedLayersComputed,(function(t){return["wmts"===t.type?a("vl-layer-tile",{key:t.id,attrs:{"z-index":parseInt(t.zIndex)}},[a("vl-source-wmts",{attrs:{attributions:t.attribution,url:t.url,"layer-name":t.layerName,"matrix-set":t.matrixSet,format:t.format,"style-name":t.styleName}})],1):e._e()]})),e._l(e.selectedLayersComputed,(function(t){return["wms"===t.type?a("vl-layer-tile",{key:t.id,attrs:{"z-index":parseInt(t.zIndex)}},[a("vl-source-wms",{attrs:{attributions:t.attribution,url:t.url,layers:t.layer,projection:t.projection,format:t.format,version:t.version}})],1):e._e()]})),e._l(e.selectedLayersComputed,(function(t){return["raster"===t.type?a("vl-layer-tile",{key:t.id,attrs:{"z-index":parseInt(t.zIndex)}},[a("vl-source-xyz",{attrs:{url:t.source,attributions:t.attribution}})],1):e._e()]}))],2)],1)],1)}),d=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"md-layout-item md-size-100"},[a("div",{staticClass:"md-layout md-alignment-center-center loading-block"},[a("span",{staticClass:"md-display-1"},[e._v("Loading...")])])])}],c=(a("d81d"),a("a9e3"),a("d3b7"),a("bc81")),m=a("a79f"),u=a("8295"),p=a("6c77"),v=a("83a6"),f=a("2986"),y=a("bc3a");m["a"].defs("EPSG:3301","+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"),Object(c["a"])(m["a"]);var g={name:"Map",props:{selectedLayersProp:Array,mapZoomProp:Number,mapCenterProp:Array},watch:{geoJSONserviceLayerComputed:function(e,t){e!==t&&!1!==e&&(this.geoJSONdata=[],this.geoJsonUrlAlert=!0,this.clickOnMapDetection=!1)}},data:function(){return{dataZoom:this.zoomComputed,dataCenter:this.centerComputed,dataCursorCoordinates:0,geoJSONdata:[],geoJSONdataSingleFeature:[],dataLoadingStatus:!1,clickOnMapDetection:!1,geoJsonUrlAlert:!1,geoJSONdataSourceError:!1,geoJSONdataSourceErrorText:"",selectedVectorTileFeature:!1}},computed:{zoomComputed:{get:function(){return this.mapZoomProp},set:function(e){this.dataZoom=e}},centerComputed:{get:function(){return this.mapCenterProp},set:function(e){this.dataCenter=e}},projComputed:function(){return"EPSG:4326"},selectedLayersComputed:function(){return this.selectedLayersProp},geoJSONserviceLayerComputed:function(){if(this.selectedLayersProp.length>0){var e=this.selectedLayersProp,t=e.filter((function(e){return"geojsonservice"===e.type}));return t.length>0&&t[0]}return!1},EstSoilMapVectorTileComputed:function(){var e=this.selectedLayersProp,t=e.filter((function(e){return"12cdropdenser816"===e.id}));return t.length>0&&t[0]},LandboardDEMGridsComputed:function(){var e=this.selectedLayersProp,t=e.filter((function(e){return"LandboardDEMGrids"===e.id}));return t.length>0&&t[0]},ProcessingZonesComputed:function(){var e=this.selectedLayersProp,t=e.filter((function(e){return"ProcessingZones"===e.id}));return t.length>0&&t[0]},EstSoilMapVectorTileSingleComputed:function(){var e=this.selectedLayersComputed,t=e.filter((function(e){return"data"===e.layerType}));return 1==t.length&&"12cdropdenser816"==t[0].id},KPOKaitsepuhverSingleComputed:function(){var e=this.selectedLayersComputed,t=e.filter((function(e){return"data"===e.layerType}));return 1==t.length&&"KPOKaitsepuhver"==t[0].id},MSRKaitsepuhverSingleComputed:function(){var e=this.selectedLayersComputed,t=e.filter((function(e){return"data"===e.layerType}));return 1==t.length&&"MSRKaitsepuhver"==t[0].id},EstSoilMapVectorTilesStyleComputed:function(){return!0===this.EstSoilMapVectorTileComputed.labels||this.EstSoilMapVectorTileComputed.labels,this.EstSoilMapVectorTilesStyle}},methods:{removeLayersInMap:function(){this.$emit("remove-maplayers",""),this.selectedVectorTileFeature=!1},setDefaultMapZoom:function(){this.$emit("default-mapzoom","")},spatialQueryOnClick:function(e){var t=this;if(this.geoJSONserviceLayerComputed){this.geoJSONdata=[],this.dataLoadingStatus=!0,this.dataCursorCoordinates=e.coordinate;var a=e.coordinate[0],i=e.coordinate[1],o=a+","+i+","+a+","+i;setTimeout((function(){y.get(t.geoJSONserviceLayerComputed.source+"?bbox="+o+"&f=json").then((function(e){return t.geoJSONdata=e.data.features,t.geoJSONdataSingleFeature=e.data.features[0],t.clickOnMapDetection=!0})).catch((function(e){return t.geoJSONdataSourceError=!0,t.clickOnMapDetection=!1,t.geoJSONdataSourceErrorText=e})).finally((function(){return t.dataLoadingStatus=!1}))}),1e3)}if(!this.LandboardDEMGridsComputed&&!this.ProcessingZonesComputed){this.selectedVectorTileFeature=!1;var s=this.$refs.map.getFeaturesAtPixel(e.pixel);if(s&&s.length>0){var r=s[0];this.selectedVectorTileFeature=r}}},EstSoilMapVectorTilesStyle:function(){var e=.7,t="rgba(196,4,17,"+e+")",a="rgba(244,134,0,"+e+")",i="rgba(243,187,64,"+e+")",o="rgba(255,247,78,"+e+")",s="rgba(81,214,177,"+e+")",r="rgba(48,175,210,"+e+")",l="rgba(43,155,162,"+e+")",n="rgba(59,123,233,"+e+")",d="rgba(43,87,186,"+e+")",c="rgba(112,71,1,"+e+")",m="rgba(140,164,173,"+e+")",u="rgba(0,0,0,"+e+")",p=Object(f["x"])({fillColor:u,strokeColor:u}),v=Object(f["x"])({fillColor:t,strokeColor:t}),y=Object(f["x"])({fillColor:a,strokeColor:a}),g=Object(f["x"])({fillColor:i,strokeColor:i}),b=Object(f["x"])({fillColor:o,strokeColor:o}),C=Object(f["x"])({fillColor:s,strokeColor:s}),h=Object(f["x"])({fillColor:r,strokeColor:r}),_=Object(f["x"])({fillColor:l,strokeColor:l}),x=Object(f["x"])({fillColor:n,strokeColor:n}),k=Object(f["x"])({fillColor:d,strokeColor:d}),S=Object(f["x"])({fillColor:c,strokeColor:c}),L=Object(f["x"])({fillColor:m,strokeColor:m});return function(e){return"S"==e.get("lxtype1")?v:"LS"==e.get("lxtype1")?y:"SL"==e.get("lxtype1")?g:"L"==e.get("lxtype1")?b:"SiL"==e.get("lxtype1")?C:"SiCL"==e.get("lxtype1")?h:"CL"==e.get("lxtype1")?_:"C"==e.get("lxtype1")?x:"HC"==e.get("lxtype1")?k:"PEAT"==e.get("lxtype1")?S:"GRAVELS"==e.get("lxtype1")?L:p}},EstSoilMapVectorTilesStyleExperimental:function(){var e=.7,t="rgba(196,4,17,"+e+")",a="rgba(244,134,0,"+e+")",i="rgba(243,187,64,"+e+")",o="rgba(255,247,78,"+e+")",s="rgba(81,214,177,"+e+")",r="rgba(48,175,210,"+e+")",l="rgba(43,155,162,"+e+")",n="rgba(59,123,233,"+e+")",d="rgba(43,87,186,"+e+")",c="rgba(112,71,1,"+e+")",m="rgba(140,164,173,"+e+")",f="rgba(0,0,0,"+e+")",y="rgb(33,33,33)",g="11px Roboto,Calibri,sans-serif",b=new p["c"]({fill:new v["a"]({}),text:new u["a"]({font:g,fill:new v["a"]({color:y}),overflow:!1})});return function(e){switch(e.get("lxtype1")){case"S":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(t),b;case"LS":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(a),b;case"SL":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(i),b;case"L":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(o),b;case"SiL":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(s),b;case"SiCL":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(r),b;case"CL":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(l),b;case"C":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(n),b;case"HC":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(d),b;case"PEAT":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(c),b;case"GRAVELS":return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(m),b;default:return b.getText().setText(e.get("lxtype1")),b.getFill().setColor(f),b}}},KPOKaitsepuhverVectorTilesStyle:function(){var e=.4,t="93, 102, 7",a="rgb("+t+")",i="rgba("+t+","+e+")",o=Object(f["x"])({fillColor:i,strokeColor:a});return function(e){if(e)return o}},MSRKaitsepuhverVectorTilesStyle:function(){var e=.4,t="128, 69, 6",a="rgb("+t+")",i="rgba("+t+","+e+")",o=Object(f["x"])({fillColor:i,strokeColor:a});return function(e){if(e)return o}},ProcessingZonesStyles:function(){return function(e){var t=e.get("id")+"",a=Object(f["x"])({strokeColor:"rgba(102, 187, 106, 0.9)",text:new u["a"]({text:t,font:"16px roboto",overflow:!1,fill:new v["a"]({color:"rgb(66,66,66)"})})});return a}},LandboardDEMGridsStyles:function(){return function(e){var t=e.get("grid_id")+"",a=Object(f["x"])({strokeColor:"rgba(255, 235, 59, 0.9)",text:new u["a"]({text:t,font:"12px roboto",overflow:!1,fill:new v["a"]({color:"rgb(66,66,66)"})})});return a}},resetGeoJSONdata:function(){this.geoJSONdata=[],this.clickOnMapDetection=!1},fitSelectedJSONfeatures:function(){var e=this.$refs.geoJsonServicesSource.$source.getExtent();this.$refs.view.fit(e)}}},b=g,C=(a("0f39"),a("2877")),h=Object(C["a"])(b,n,d,!1,null,"17b692e4",null),_=h.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("div",{staticClass:"md-layout md-alignment-top-center"},[a("div",{staticClass:"md-layout-item md-large-size-60 md-medium-size-60 md-small-size-100 md-xsmall-size-100"},[a("md-card",[a("md-card-header",{staticClass:"about-card-header"},[a("div",{staticClass:"md-title"},[a("a",{attrs:{href:"https://kik.ee/et/"}},[a("img",{staticClass:"about-card_kik-logo",attrs:{src:"/webgis-performance/img/kik-logo.png",alt:"kik-logo"}})])])]),a("md-card-content",{staticClass:"about-card-content"},[a("div",{staticClass:"margin-top-bottom"},[a("span",{staticClass:"md-body-1"},[e._v("Lisainfo: ")]),a("a",{attrs:{href:"https://kik.ee/et/elluviimine/keskkonnaprogrammi-projektide-elluviimine"}},[e._v("https://kik.ee/et/elluviimine/keskkonnaprogrammi-projektide-elluviimine")])]),a("div",[a("span",{staticClass:"md-display-1"},[e._v('Projekt "Veekaitsevööndite reostustundlikkuse ja kaldavööndi puhverribade rajamise vajalikkuse hinnangute kaardikihtide loomine"')])]),a("div",{staticClass:"md-layout md-alignment-top-right"},[a("div",{staticClass:"margin-top-bottom"},[a("span",{staticClass:"md-subheading"},[e._v("Evelyn Uuemaa, Ain Kull, Kiira Mõisja, Alexander Kmoch")])])]),a("div",[a("span",{staticClass:"md-headline"},[e._v("Projekti eesmärgiks oli:")])]),a("ol",[a("li",[a("span",{staticClass:"md-body-1"},[e._v("tekitada veekaitsevööndite reostustundlikkuse hinnagu kaardikiht mullakaardi (lõimis, mullatüüp) ja LiDARil põhinevate reljeefi näitajate (nõlva kalle, märguse indeks jms) ning taimkatte kõrguse mudeli alusel;")])]),a("li",[a("span",{staticClass:"md-body-1"},[e._v("veekaitsevööndite reostustundlikkuse hinnagu põhjal luua kaldakaitseribade rajamise soovituste kaardikiht, mis annaks hinnangu iga veekaitsevööndi kohta, kas ja kui palju oleks sinna vaja rajada kaldakaitse riba ning kui lai ja millise struktuuriga see võiks olla;")])]),a("li",[a("span",{staticClass:"md-body-1"},[e._v("lisada Eesti digitaalsele mullakaardile toitainete väljakande modelleerimiseks vajalikud numbrilised parameetrid, mida saab kasutada enamlevinud mudelite (sh Veeveebis kasutusel olev EstModel) arvutustes (erinevate lõimisega muldade osakaal, lähendid mulla lasuvustihedusele).")])])]),a("div",{staticClass:"text-justify"},[a("span",{staticClass:"md-body-1"},[e._v(" Töö tulemus võimaldab kuluefektiivsemalt planeerida ja vähendada põllumajanduslikust hajureostusest tulenevat koormust veekogudes. Loodavate kaardikihtide abil on võimalik kiiresti tuvastada probleemsed ja väga reostustundlikud kaldavööndid, kuhu oleks soovituslik laiem veekaitsevöönd ja/või rajada kaldavööndi puhverriba. Kuna puhverribade rajamine on kulukas ja nende alla jääv põllumajanduslik maa jääb tootmisest välja, siis on mõistlik rajada puhverribasid eelkõige probleemsematesse kohtadesse. Lisandväärtusena kaasnevad digitaalse mullakaardi numbrilised parameetrid ja soovituslikud arvutusvalemid toitainete ärakande paremaks modelleerimiseks. ")])]),a("div",{staticClass:"margin-top-bottom"},[a("strong",[e._v("Projekti on rahastanud: ")]),a("span",{staticClass:"md-body-1"},[e._v("Keskkonnainvesteeringute Keskus (KIK), Euroopa Komisjoni Marie Curie individuaalgrant number 795625 ")])]),a("div",{staticClass:"md-layout md-alignment-top-center md-gutter"},[a("div",{staticClass:"md-layout-item md-large-size-50 md-medium-size-50 md-small-size-100 md-xsmall-size-100"},[a("div",[a("a",{attrs:{href:"https://www.geograafia.ut.ee/et"}},[a("img",{staticClass:"about-card-logo",attrs:{src:"/webgis-performance/img/geograafia-logo.png",alt:"geograafia-logo"}})])]),a("div",{staticClass:"margin-top-bottom"},[a("span",{staticClass:"md-body-1"},[e._v("Lisainfo: ")]),a("a",{attrs:{href:"https://landscape-geoinformatics.ut.ee/projects-et?lang=et"}},[e._v("https://landscape-geoinformatics.ut.ee/projects-et?lang=et")])]),a("div",{staticClass:"margin-top-bottom"},[a("span",{staticClass:"md-body-1"},[a("strong",[e._v("Veebiarenduse prototüüp: ")]),a("br"),e._v("Alexander Kmoch, Alexander Matsibora ")])])]),a("div",{staticClass:"md-layout-item md-large-size-50 md-medium-size-50 md-small-size-100 md-xsmall-size-100"},[a("div",[a("a",{attrs:{href:"#"}},[a("img",{staticClass:"about-card-logo",attrs:{src:"/webgis-performance/img/msca-logo.png",alt:"msca-logo"}})])]),a("div",{staticClass:"margin-top-bottom"},[a("span",{staticClass:"md-body-1"},[e._v("Lisainfo: ")]),a("a",{attrs:{href:"#"}},[e._v("url...")])])])])]),a("md-card-actions",[a("md-button",{staticClass:"md-accent",on:{click:function(t){return e.closeAbout()}}},[a("md-icon",[e._v("cancel")]),e._v(" CLOSE")],1)],1)],1)],1)])])},k=[],S={name:"About",data:function(){return{}},methods:{closeAbout:function(){this.$emit("close-about","")}}},L=S,T=(a("92b6"),Object(C["a"])(L,x,k,!1,null,"869ff918",null)),O=T.exports,I=a("0d7c"),j={name:"App",components:{Map:_,About:O},data:function(){return{layersList:I,baseLayerSelected:{},mapZoomDefault:7,mapCenterDefault:[24.728699075440534,58.699046154309144],menuVisible:!1,aboutProject:!1}},methods:{cleanMap:function(){var e=this.layersList;e.forEach((function(e){"OpenStreetMap"!==e.id&&"data"===e.layerType&&(e.visibility=!1)}));var t=e.filter((function(e){return"OpenStreetMap"===e.id}));this.baseLayerSelected=t[0]},defaultMapZoom:function(){this.mapZoomDefault=7,this.mapCenterDefault=[24.728699075440534,58.699046154309144]},loadBaseLayer:function(){var e=this.layersList,t=e.filter((function(e){return"OpenStreetMap"===e.id}));this.baseLayerSelected=t[0]}},mounted:function(){this.loadBaseLayer()},computed:{sortedLayerListComputed:function(){var e=this.layersList,t=e.sort((function(e,t){if(e.visibility<t.visibility)return 1;if(e.visibility>t.visibility)return-1;if(e.visibility==t.visibility){if(parseInt(e.zIndex)<parseInt(t.zIndex))return 1;if(parseInt(e.zIndex)>parseInt(t.zIndex))return-1;if(parseInt(e.zIndex)==parseInt(t.zIndex)){if(e.orderInList<t.orderInList)return 1;if(e.orderInList>t.orderInList)return-1}}}));return t},sortedDataLayerListComputed:function(){var e=this.sortedLayerListComputed,t=e.filter((function(e){return"data"===e.layerType}));return t},sortedBaseLayerListComputed:function(){var e=this.layersList,t=e.filter((function(e){return"base"===e.layerType})),a=t.sort((function(e,t){return e.orderInList<t.orderInList?1:e.orderInList>t.orderInList?-1:void 0}));return a},activeLayerListComputed:function(){var e=this.sortedDataLayerListComputed,t=e.filter((function(e){return!0===e.visibility&&"data"===e.layerType}));return t.push(this.baseLayerSelected),t}}},w=j,M=(a("fc03"),a("b0a0"),Object(C["a"])(w,r,l,!1,null,"540661ec",null)),z=M.exports;i["default"].use(o["MdToolbar"]),i["default"].use(o["MdButton"]),i["default"].use(o["MdDrawer"]),i["default"].use(o["MdIcon"]),i["default"].use(o["MdRadio"]),i["default"].use(o["MdBadge"]),i["default"].use(o["MdCard"]),i["default"].use(o["MdCheckbox"]),i["default"].use(o["MdDialog"]),i["default"].use(o["MdProgress"]),i["default"].use(o["MdTable"]),i["default"].use(o["MdTooltip"]),i["default"].use(o["MdDialogAlert"]),i["default"].use(o["MdContent"]),i["default"].use(s["b"]),i["default"].use(s["h"]),i["default"].use(s["i"]),i["default"].use(s["d"]),i["default"].use(s["c"]),i["default"].use(s["a"]),i["default"].use(s["e"]),i["default"].use(s["f"]),i["default"].use(s["j"]),i["default"].use(s["k"]),i["default"].use(s["g"]),i["default"].use(s["m"]),i["default"].use(s["l"]),i["default"].use(s["n"]),i["default"].config.productionTip=!1,new i["default"]({render:function(e){return e(z)}}).$mount("#app")},8305:function(e,t,a){},"92b6":function(e,t,a){"use strict";var i=a("db2e"),o=a.n(i);o.a},b0a0:function(e,t,a){"use strict";var i=a("452c"),o=a.n(i);o.a},d4d3:function(e,t,a){},db2e:function(e,t,a){},fc03:function(e,t,a){"use strict";var i=a("d4d3"),o=a.n(i);o.a}});