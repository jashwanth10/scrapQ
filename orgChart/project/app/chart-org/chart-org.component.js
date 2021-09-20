'use strict';

var app = angular.module('chartOrg', []);
var max_level = 1;

// fetching the data
fetch("data/org-tree-data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        // Travelling through the data. performing DFS and storing the data
        traverse(data[0],1);
    });


var nodes = []
var nodeDict = {}
var location_map = []


function setData(node){

    location_map = [];
    locationTraverse(nodeDict[node]);
    // localStorage is used for data transfer to test.html(google map integration)
    localStorage["data"]  = JSON.stringify(location_map);

}

// collecting data for google map
function locationTraverse(node){

    var temp ;

    // temp = [node.userName,node.latitude,node.longitude,node.img,node.userMobile,node.userType];
    // for checking purpose, for usage uncomment above one
    temp = [node.userName,Math.random()*90,Math.random()*90,"https://cdn.balkan.app/shared/3.jpg",node.userMobile,node.userType]
    location_map.push(temp);
    if('children' in node){
        node.children.forEach(element => {
            locationTraverse(element);
        });
    }

}


// performing DFS
function traverse(node,level){

    nodeDict[node.userId] = node;

    var temp;
    var immediate_children = 0;
    if('children' in node)
    {
        immediate_children = node.children.length;
    }
    var count_children = 0;

    if('children' in node){
        
        node.children.forEach(element => {
            // traversing through the children
            count_children = count_children+ traverse(element,level+1);
            if(level+1>max_level)
            {
                max_level = level+1;
            }
        });
        
    }
    // storing the needed information from json and performmed operations(replace img)
    temp = {
        "id": node.userId,"pid":node.ownerId, "name": node.userName,"tags":[(level).toString()],
        "work" : node.userType,
        "img": "https://cdn.balkan.app/shared/3.jpg","mobile":"Mobile:"+ node.userMobile,
        "link": `setData('${node.userId}')`,
        "latitude":node.latitude,
        "longitude":node.longitude,
        "immediate_children" :"Immediate Reportees:"+immediate_children,
        "count_children" : "Total Reportees:"+count_children,
    };
    nodes.push(temp);
    return count_children+1;
    
}

// declaring the Orgchart Template and specifing Node structure
OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.myTemplate.node = '<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#1C1C1C"></circle>'; 
OrgChart.templates.myTemplate.node ='<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="#039BE5"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'

// for map icon, immediate reportee, total reportee placing them in the node
OrgChart.templates.ula.field_6 = 
'<text style="font-size: 13px;" fill="#000000" x="5" y="135" >{val}</text>';
OrgChart.templates.ula.field_2 = 
'<text style="font-size: 13px;" fill="#00A000" x="100" y="100" >{val}</text>';
OrgChart.templates.ula.field_3 = '<a target="_blank" href="../test.html" onClick={val}><image  xlink:href="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" x="250" y="1" width="30" height="30"/></a>';
OrgChart.templates.ula.field_7 = 
'<text style="font-size: 13px;border: 2px solid black;" fill="#000000" x="180" y="135" >{val}</text>';
 OrgChart.templates.ula.size = [300, 150];

//Returns random color for each level
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

// toggle function to change the orientation
function toggle_button(){
   
    console.log(tags_check,"tags_check");
    if(current ==0 )
    {

        var chart = new OrgChart(document.getElementById("hello"), {

            mouseScrool: OrgChart.action.scroll,
            // gives different hierarchy mixed
            layout: OrgChart.mixed, 
            mixedHierarchyNodesSeparation: 50,
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
            mixedHierarchyNodesSeparation: 50,
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

            // color coding for all the levels, where max level is calculated in our traverse function
            for(var teee=1;teee<=max_level;teee++)
            {
                
                var name_string = "node"+'_'+teee.toString();
                OrgChart.templates[name_string] = Object.assign({}, OrgChart.templates.ula);
                var stroke_color = getRandomColor()

                OrgChart.templates[name_string].node = `<line x1="0" y1="0" x2="300" y2="0" stroke-width="20" stroke="${stroke_color}"></line>' +'<rect x="0" y="0" height="150" width="300" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>`
                var temp;
                var curr_level = teee.toString();
                temp = {template:name_string};
                tags_check[curr_level]=temp;
            
            }   
            
           // For Div id - hello Orgchart is rendered
            this.chart = new OrgChart(document.getElementById("hello"), {

                mouseScrool: OrgChart.action.scroll,
                // gives different hierarchy mixed
                layout: OrgChart.mixed, 
                mixedHierarchyNodesSeparation: 50,
                // subtreeSeparation: 100,
                nodeMouseClick: OrgChart.action.none,
                orientation: OrgChart.orientation.top,
                // height:100,

                template: "myTemplate",
                
                // tags check for color mapping etc
                tags : tags_check,

                // mini map 
                miniMap: true,
                //node binding, the things which we want to show in the node.
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

                    
                },
                toolbar: {

                    fullScreen: true,
                    zoom: true,
                    fit: true,
                    expandAll: true
                  
                },
                nodes: nodes
            });

            

            this.chart.on('field', function(sender, args){
                console.log("checkkk");
                var name = args.data["name"];
                              var link = args.data["link"];
                  args.value = '<a target="_blank" href="' + link + '">' + name +  '</a>';
          });

         
         
        
          
        },
        
    });