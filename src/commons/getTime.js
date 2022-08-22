export default{
    //首页时间转化
    dateTime(e){
        let old = new Date(e);
        let now = new Date();
        //获取old具体时间
        let d = old.getTime();
        let h = old.getHours();
        let m = old.getMinutes();
        let Y = old.getYear()-100;
        let M = old.getMonth()+1;
        let D = old.getDate();
        //获取现在具体时间
        let nd = now.getTime();
        let nh = now.getHours();
        let nm = now.getMinutes();
        let nY = now.getYear()-100;
        let nM = now.getMonth()+1;
        let nD = now.getDate();


        //当天时间
        if(D === nD && M === nM && Y === nY){
            if(h<10){
                h = '0'+h;
            }
            if(m<10){
                m = '0'+m
            }
            return h+':'+m
        }

        //前天时间
        if(D+1 === nD && M === nM && Y === nY){
            if(h<10){
                h = '0'+h;
            }
            if(m<10){
                m = '0'+m
            }
            return '前天'+h+':'+m
        }else{
            //大于两天
            return Y+'/'+M+'/'+D;
        }
    },

    getDateStr(e){
        let time = new Date(e);
        //获取time具体时间
        let d = time.getTime();
        let h = time.getHours();
        let m = time.getMinutes();
        let Y = time.getYear();
        let M = time.getMonth()+1;
        let D = time.getDate();
        return ""
    },

    //根据出生日期计算年龄
    getAge(strBirthday){
        let strBirthdayArr0 = strBirthday.split("T")[0];
        let strBirthdayArr = strBirthdayArr0.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();
        let Age;

        if(nowYear === birthYear){
            Age = 0
            return 0;//同年 则为0岁
        }else{
            let ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0){
                if(nowMonth === birthMonth) {
                    let dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0)
                    {
                        Age = ageDiff - 1;
                        return ageDiff - 1;
                    }
                    else
                    {
                        Age = ageDiff;
                        return ageDiff ;
                    }
                }
                else
                {
                    let monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0)
                    {
                        Age = ageDiff - 1;
                        return ageDiff - 1;
                    }
                    else
                    {
                        Age = ageDiff;
                        return ageDiff ;
                    }
                }
            }
            else
            {
                return -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }
        // return  Age;//返回周岁年龄
    },



    //计算天数差的函数，通用
    DateDiff(strBirthday){    //sDate1和sDate2是2006-12-18格式
        let sDate2 = strBirthday.split("T")[0];

        let   oDate1,  oDate2,  iDays;
        let aDate = [];
        let newDate = new Date()
        aDate[0] = newDate.getFullYear();
        aDate[1] = newDate.getMonth()+1;
        aDate[2] = newDate.getDate();
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
        aDate  =  sDate2.split("-")
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
        return  iDays
    },


    //转换时间格式yy-mm-dd hh:mm
    transferTimeFormat(time){

    }
}