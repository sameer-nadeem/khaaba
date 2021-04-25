import React from 'react'
import { Bar } from 'react-chartjs-2';

const BarChartSecond =({chartDataMonthly})=>{
    // let dayDict = {
    //     0: 'Sunday',
    //     1: 'Monday',
    //     2: 'Tuesday',
    //     3: 'Wednesday',
    //     4: 'Thursday',
    //     5: 'Friday',
    //     6: 'Saturday',
    // }
    // const dateArr = () => {
    //     let dayArr = []
    //     var today = new Date()

    //     dayArr.pus)
    //     console.log(dayArr)
    //     return dayArr
        
    // }

    // let dayDict = {
    //     0: 'Sunday',
    //     1: 'Monday',
    //     2: 'Tuesday',
    //     3: 'Wednesday',
    //     4: 'Thursday',
    //     5: 'Friday',
    //     6: 'Saturday',
    // }

    return (
        <div>
            < Bar 
            data= {{
                labels: ['This Month','Last Month', '2Months Ago', '3Months Ago', '4Months Ago'],
                datasets: [{
                    label: '# of Orders',
                    data: chartDataMonthly,
                    backgroundColor: '#ff6433'
                }]
            }}
            
            />

        </div>
    )
        
}

export default BarChartSecond