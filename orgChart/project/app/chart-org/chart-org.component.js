'use strict';

var app = angular.module('chartOrg', []);
var max_level = 1;
fetch("data/org-tree-data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        traverse(data[0],1);
    });

var nodes = []
var nodeDict = {}
var location_map = []

function setData(node){
    // console.log(nodeDict[node]);
    location_map = [];
    locationTraverse(nodeDict[node]);
    
    var locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
      ];
    localStorage["data"]  = JSON.stringify(location_map);
}

function locationTraverse(node){
    var temp ;
    // console.log(node.latitude);
    // console.log(node.longitude,"helllllllllllllllllllllllllllll");
    // temp = [node.userName,node.latitude,node.longitude,node.img];


    // for checking purpose, for usage uncomment above one

    temp = [node.userName,Math.random()*100,Math.random()*100,"https://cdn.balkan.app/shared/3.jpg"]
    // console.log(temp);
    location_map.push(temp);
    if('children' in node){
        node.children.forEach(element => {
            locationTraverse(element);
        });
    }
}


function traverse(node,level){

    nodeDict[node.userId] = node;

    var temp;
    // console.log(node);
    
    // for img node.img should be used if we have images
    // console.log(temp);
    var immediate_children = 0;
    if('children' in node)
    {
        // console.log(node.children.length,"hellooo");
        immediate_children = node.children.length;

    }
    
    var count_children = 0;
    

    if('children' in node){
        node.children.forEach(element => {
            count_children = count_children+ traverse(element,level+1);
            if(level+1>max_level)
            {
                max_level = level+1;
            }
        });
        
    }
    temp = {
        "id": node.userId,"pid":node.ownerId, "name": node.userName,"tags":[(level).toString()],
        "img": "https://cdn.balkan.app/shared/3.jpg","mobile":"Mobile:"+ node.userMobile,
        "link":`<a target="_blank" href="../test.html" onClick={setData('${node.userId}')}>Location</a>`,
        "latitude":node.latitude,
        "longitude":node.longitude,
        "immediate_children" : immediate_children,
        "count_children" : count_children,
        "map_icon" : "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
    };
    console.log(temp);
    nodes.push(temp);
    return count_children+1;
    
}

OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.myTemplate.node = '<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#1C1C1C"></circle>'; 
OrgChart.templates.myTemplate.node ='<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="#039BE5"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.green = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.green.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="#000000"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'

OrgChart.templates.red = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.red.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="red"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.blue = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.blue.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="blue"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.yellow = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.yellow.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="yellow"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'

// var just_name = 
// OrgChart.templates.node_1 = Object.assign({}, OrgChart.templates.ula);
// OrgChart.templates.node_1.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="pink"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'
// OrgChart.templates.ula.field_3 = 
// '<text class="field_3" style="font-size: 14px;" fill="#000000" x="120" y="100" text-anchor="right-bottom">{val}</text>';
OrgChart.templates.ula.field_6 = 
'<text class="field_6" style="font-size: 14px;" fill="#000000" x="120" y="100" >{val}</text>';
OrgChart.templates.ula.field_3 = 
'<text class="field_3" style="font-size: 14px;" fill="#000000" x="180" y="20" text-anchor="top-right">{val}</text>';
OrgChart.templates.ula.img_1 = '<image  xlink:href="{val}" x="180" y="1" width="30" height="30"><a</image>';
OrgChart.templates.ula.field_7 = 
'<text class="field_6" style="font-size: 14px;" fill="#000000" x="150" y="100" >{val}</text>';


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
var current = 0;
var tags_check;
tags_check = {};
function toggle_button(){
    console.log(tags_check,"tags_check");
    if(current ==0 )
    {
        var chart = new OrgChart(document.getElementById("hello"), {

            mouseScrool: OrgChart.action.scroll,
            // gives different hierarchy mixed
            layout: OrgChart.mixed, 
            nodeMouseClick: OrgChart.action.none,
            orientation: OrgChart.orientation.left_top,
            // height:100,
    
            template: "myTemplate",
            
            tags : tags_check,
            miniMap: true,
            nodeBinding: {
                field_0: "name",
                field_2:"work",
                field_1:"mobile",
                img_0 : "img",
                field_3:"link",
                field_4:"latitude",
                field_5:"longitude",
                field_6 : "immediate_children",
                field_7: "count_children",
                img_1 :"map_icon"

                
            },
            toolbar: {
                fullScreen: true,
                zoom: true,
                fit: true,
                expandAll: true
              },
            nodes: nodes
        });
        current = 1;
    }
    else{
        var chart = new OrgChart(document.getElementById("hello"), {

            mouseScrool: OrgChart.action.scroll,
            // gives different hierarchy mixed
            layout: OrgChart.mixed, 
            nodeMouseClick: OrgChart.action.none,
            orientation: OrgChart.orientation.top,
            // height:100,
    
            template: "myTemplate",
            
            tags : tags_check,
            miniMap: true,
            nodeBinding: {
                field_0: "name",
                field_2:"work",
                field_1:"mobile",
                img_0 : "img",
                field_3:"link",
                field_4:"latitude",
                field_5:"longitude",
                field_6:"immediate_children",
                field_7: "count_children",
                img_1 :"map_icon"
                
            },
            toolbar: {
                fullScreen: true,
                zoom: true,
                fit: true,
                expandAll: true
              },
            nodes: nodes
        });
        current = 0;
    }
    
}


angular.
    module('chartOrg').
    component('chartOrg', {
        templateUrl: 'chart-org/chart-org.template.html' ,
        controller: function chartOrgController(){
            // var tags_check;
            // tags_check = {};
            for(var teee=1;teee<=max_level;teee++)
            {
                var name_string = "node"+'_'+teee.toString();
                    // OrgChart.templates.name_string = Object.assign({}, OrgChart.templates.ula);
                OrgChart.templates[name_string] = Object.assign({}, OrgChart.templates.ula);
                var stroke_color = getRandomColor()

                // OrgChart.templates[name_string].node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="pink"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'
                OrgChart.templates[name_string].node = `<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="${stroke_color}"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>`
                // console.log(stroke_color,"strokee colorrr");
                // OrgChart.templates.name_string.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="black"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'
                var temp;
                var curr_level = teee.toString();
                temp = {template:name_string};
                tags_check[curr_level]=temp;
            
            }   
            
           
            this.chart = new OrgChart(document.getElementById("hello"), {

                mouseScrool: OrgChart.action.scroll,
                // gives different hierarchy mixed
                layout: OrgChart.mixed, 
                nodeMouseClick: OrgChart.action.none,
                orientation: OrgChart.orientation.top,
                // height:100,

                template: "myTemplate",
                
                tags : tags_check,
                miniMap: true,
                nodeBinding: {
                    field_0: "name",
                    field_2:"work",
                    field_1:"mobile",
                    img_0 : "img",
                    field_3:"link",
                    field_4:"latitude",
                    field_5:"longitude",
                    field_6 : "immediate_children",
                    field_7: "count_children",
                    img_1 :"map_icon"
                    
                },
                toolbar: {
                    fullScreen: true,
                    zoom: true,
                    fit: true,
                    expandAll: true
                  },
                nodes: nodes
            });

            

            // console.log(this.chart._layoutConfigs["base"]["orientation"]);
            // this.chart._layoutConfigs["base"]["orientation"] = 3;
            // console.log(this.chart._layoutConfigs["base"]["orientation"]);
            


            this.chart.on('field', function(sender, args){
                console.log("checkkk");
                var name = args.data["name"];
                              var link = args.data["link"];
                  args.value = '<a target="_blank" href="' + link + '">' + name +  '</a>';
          });

         
         
        
          
        },
        
    });



