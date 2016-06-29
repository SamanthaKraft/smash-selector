angular.module('deal', []);

angular.module('deal').controller('dealController', function($scope){
   $scope.selected = {value:"Smashy"};
 $scope.list= [
    {
    value: 'Year of Rob',
    id: '1'
    },
    {
    value: 'Kevin O',
    id: '2'
    },
    {
    value: 'Kevin B',
    id: '3'
    },
       {
    value: 'Smashy',
    id: '4'
    },
    {
    value: 'Dr Dre',
    id: '5'
    },
    {
    value: 'Briening',
    id: '6'
    },   {
    value: 'Ton Ton',
    id: '7'
    },
    {
    value: 'Matias',
    id: '8'
    },
    {
    value: 'Gerardo',
    id: '9'
    },
    {
    value: 'Sam Hairjell',
    id: '10'
    },
    {
    value: 'Carolina',
    id: '11'
    }],
    
    
 $scope.friends= [
    {
    type: 'paul',
    id: '1'
    },
    {
    type: 'jawn',
    id: '2'
    },
    {
    type: 'staci',
    id: '3'
    },
       {
    type: 'crack jack',
    id: '4'
    },
    {
    type: 'french fries are pretty good but you know, they are kinda bad for you',
    id: '5'
    },
    {
    type: 'Briening',
    id: '6'
    },   {
    type: 'froi',
    id: '7'
    },
    {
    type: 'tariq',
    id: '8'
    },
    {
    type: 'stella',
    id: '9'
    },
    {
    type: 'mikeymike',
    id: '10'
    },
    {
    type: 'Carolina',
    id: '11'
    }];
    
});


angular.module('deal').directive('smashSelector', function($filter){
  return{
    
    restrict: 'E',
    templateUrl: 'selector.html',
    replace:true,
    scope: {
      searchInput: '=?filter',
      smashList: '=list',
      smashValue: '@value',
      smashSelected: '=?selected',
      smashabetize: '@?alphabetize'
    },
    controller: function($scope){
     $scope.beginType=false;
     $scope.selectedIndex = 0;
     $scope.filteredList ={}
  
 
     if($scope.smashabetize ==="true"){
    $scope.smashList = $scope.smashList.sort(function(a, b) {
    var textA = a[$scope.smashValue].toUpperCase();
    var textB = b[$scope.smashValue].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
})
  }
  
 
  
   $scope.truncate = function(string, number){
     try{
   if (string.length > number)
      return string.substring(0,number)+'...';
   else
      return string;
     } catch(e){return ""}
};
      $scope.filterList = function(){
        $scope.filteredList = $filter('filter')($scope.smashList, $scope.searchInput)
      }
     $scope.smashSelect = function(l){
       $scope.filterList();
       $scope.searchInput = "";
       $scope.beginType=false;
       $scope.count = "";
       $scope.$evalAsync();
       
       //if you want to bind the object instead of the string, make smashSelected = to l
       // then just make a new scope for the html show selected
       if(typeof l === "object"){ //for on click select
        $scope.smashSelected= l[$scope.smashValue];
       }else if(Number.isInteger(l) && l !== -1){  //for enter key select
         $scope.smashSelected = $scope.filteredList[l][$scope.smashValue]
       }
     }
      }
      
  }  
});


angular.module('deal').directive('typeSupport', function(){
  return{
    restrict: 'A',
        link: function(scope, el, attrs){
      el.on('keypress', function(evt){
        
        if(evt.keyCode && evt.keyCode != 13){
          scope.beginType = true;
          el.addClass('smashOpen');
          scope.selectedIndex="-1"
          scope.count="";
          scope.$apply();
        }
      })
      $(document).on('mouseup', function (e) {
          var container = $('.dropWindow');
          if (!container.is(e.target) && container.has(e.target).length === 0) {
              scope.beginType = false;
              scope.searchFilter = ""
              scope.$apply();
          }
      })
    },
  }
})


angular.module('deal').directive('keydown', function($document){
  return{
    restrict: 'A',
    link: function(scope, el, attrs){
     el.on('keydown', function(evt){
       console.log("stupid el", el)
      switch(evt.keyCode){
        case 38:
          moveUp();
          scrollTo(el);
          break;
        case 40:
          moveDown();
          scrollTo(el);
          break;
        case 13:
          scope.smashSelect(scope.selectedIndex);
          scope.beginType = false;
          break;
        case 9:
          scope.beginType = false;
          scope.$apply();
          break;
        case 27:
          scope.smashSelected=""
          scope.$apply();
          break;
        case 46:
          scope.smashSelected=""
          scope.$apply();
          break;
          case 37:
            scrollTo(el)
            break;
      }
      if(evt.shiftKey && evt.keyCode == 9) { 
        scope.beginType = false;
        scope.$apply();
      }
    })
    
    var scrollTo = function(e){
      var dwindow = $(e).parent('.inputDiv').siblings(".dropWindow");
      
      console.log("the right thing",dwindow)
      dwindow.scrollTop(0);
      dwindow.scrollTop(dwindow.children('.selected').offset().top-dwindow.height());
    }
    
     scope.count = "";
        var moveDown = function(){
          
        scope.filterList()
        scope.beginType=true;
        scope.$apply()
        if(scope.count === ""){
          scope.selectedIndex = 0;
        scope.count=1;
        scope.$apply()
        }else if(scope.count===1){
             scope.selectedIndex++
          scope.$apply();
        }
        if(scope.selectedIndex === scope.filteredList.length){
          scope.selectedIndex = 0;
          scope.$apply()
        
        }
    }
    
      var moveUp = function(){
        scope.filterList();
        scope.selectedIndex--;
        scope.$apply();
        
         if(scope.selectedIndex === -1){
          scope.selectedIndex = scope.filteredList.length-1;
          scope.$apply()
        }
      }
    
  }
  }
})