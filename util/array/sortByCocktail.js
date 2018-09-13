Array.prototype.sortByCocktail = function() {
  let i, left = 0, right = this.length - 1;
  let temp;
  while (left < right) {
    for (i = left; i < right; i++)
      if (this[i] > this[i + 1]) {
        temp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = temp;
      }
    right--;
    for (i = right; i > left; i--)
      if (this[i - 1] > this[i]) {
        temp = this[i];
        this[i] = this[i - 1];
        this[i - 1] = temp;
      }
    left++;
  }
};

Array.prototype.swap = function swap(i,j) {
  let temp=this[i];
  this[i]=this[j];
  this[j]=temp;
};

// [,,,undefined,null,1,'1','1file','3file','34file','8','7','6','1file'] .sort((a,b)=>String(a).length>String(b).length?1:(String(a).length<String(b).length?-1:(a>b?1:(a<b?-1:0))))
