'use strict';

var app = angular.module('chartOrg', []);

fetch("data/org-tree-data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data);
        traverse(data[0],0);
    });

var nodes = []
function traverse(node,level){
    var temp;
   
    temp = {"id": node.userId,"pid":node.ownerId, "name": node.userName,"tags":[(level+1).toString()],"img": "https://cdn.balkan.app/shared/3.jpg","mobile":node.userMobile};
    // console.log(node.children)
    nodes.push(temp)
    if('children' in node){
        node.children.forEach(element => {
            traverse(element,level+1);
        });
    }
    // for(var child in node.children){
    //     console.log("Children: ", child);
    //     traverse(child, node.userId);
    // }
}
console.log(nodes)
OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ula);
// OrgChart.templates.myTemplate.node = '<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#1C1C1C"></circle>'; 
OrgChart.templates.myTemplate.node ='<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="#039BE5"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.green = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.green.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="#000000"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'

OrgChart.templates.red = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.red.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="red"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.blue = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.blue.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="blue"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.yellow = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.yellow.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="yellow"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


angular.
    module('chartOrg').
    component('chartOrg', {
        templateUrl: 'chart-org/chart-org.template.html' ,
        controller: function chartOrgController(){
            console.log(nodes);
        
            this.chart = new OrgChart(document.getElementById("hello"), {
                mouseScrool: OrgChart.action.scroll,
                // gives different hierarchy mixed
                layout: OrgChart.mixed, 
                orientation: OrgChart.orientation.left_top,
                // height:100,

                template: "myTemplate",
                
                tags :{
                    "1":{
                        template:"green"
                    },
                    "2":{
                        template:"red"
                    },
                    "3":{
                        template:"blue"
                    },
                    "4":{
                        template:"yellow"
                    },
                },
                miniMap: true,
                nodeBinding: {
                    field_0: "name",
                    field_2:"work",
                    field_1:"mobile",
                    img_0 : "img"
                },
                toolbar: {
                    fullScreen: true,
                    zoom: true,
                    fit: true,
                    expandAll: true
                  },
                nodes: nodes
            });
            console.log(this.chart.get("5ff804cb71d84a325143d49f"),"heyyyyyyyyyyyyyyyyyyy");
          
        },
        
    });


    // [
    //     { id: 1, name: "Amber McKenzie" ,work:"hello",mobile:"1111",img: "https://cdn.balkan.app/shared/2.jpg"},
    //     { id: 2, pid: 1, name: "Ava Field",work:"hello",mobile:"1111" ,img: "https://cdn.balkan.app/shared/3.jpg"},
    //     { id: 3, pid: 1, name: "Peter Stevens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 4, pid: 2, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 5, pid: 2, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 6, pid: 2, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 7, pid: 3, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 8, pid: 3, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 9, pid: 3, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    // ]