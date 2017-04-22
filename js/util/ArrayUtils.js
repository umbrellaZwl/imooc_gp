export default class ArryUtils{
    /**
     * 更新数组，若item已存在则从数组中将它删除，否则添加进数据
     *
     * @static
     * @returns
     *
     * @memberOf ArryUtils
     */
    static updateArray(array, item){
        for(var i=0,len=array.length;i<len;i++){
            var temp = array[i];
            if(temp===item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item)
    }

    /**
     *
     *
     * 克隆一个数组
     * @param {any} from
     * @returns
     *
     * @memberOf ArryUtils
     */
    static clone(from){
        if(!from) return [];
        let newArray = [];
        for(let i=0,len=from.length;i<len;i++){
            newArray[i] = from[i];
        }
        return newArray;
    }

    /**
     *
     * 判断两个数组元素是否一一对应
     * @static
     * @param {any} arr1
     * @param {any} arr2
     * @returns
     *
     * @memberOf ArryUtils
     */
    static isEqual(arr1, arr2){
        if(!(arr1&&arr2)) return false;
        if(arr1.length !== arr2.length) return false;
        for(let i=0,l=arr2.length;i<l;i++){
            if(arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    /**
     *
     *将数组中指定元素移除
     * @static
     * @param {any} arr
     * @param {any} item
     * @returns
     *
     * @memberOf ArryUtils
     */
    static remove(arr, item){
        if( !arr ) return;
        for(let i=0,l=arr.length;i<l;i++){
            if(item===arr[i]) arr.splice(i,1)
        }
    }
}
