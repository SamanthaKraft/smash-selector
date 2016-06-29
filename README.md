my first attempt at a directive. It is a type ahead with keyboard integration.

All you NEED is your smashList which is your JSON object and your smashValue which is just the string you want 
the user to see when they are typing and selecting. 

other features: you can alphebetize your json list with the atribute alphebetize. you can also set your selected item
(which most users will need) which will bind the string value (smashValue) to your scope. I have instructions for 
in the script.js file for binding the whole object instead of just the string name. 
it'll look something like this:
       if (typeof l === "object") {        
           $scope.selectedValue = l;
           $scope.showSelectedValue = l[$scope.smashValue];
       }else if(Number.isInteger(l) && l !== -1){
           $scope.smashSelected = $scope.filteredList[l]
           $scope.showSelectedValue = $scope.filteredList[l][$scope.smashValue]
       }
and then just bind showSelectedValue in the dom with {{}} instead of selectedValue


BUGS: with two directives the keydown event will not trigger a scroll event in the second directive. It's probably 
because it's already trigering the first one. need to find a work around