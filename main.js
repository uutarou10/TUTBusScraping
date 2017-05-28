//const client = require('cheerio-httpcli')
import 'ceerio-httpcli'

function getTable(url, index) {
    client.fetch(url, (err, obj, res, body) => {
        const table = []
        let minamino = obj('table').eq(index).children().children() // trタグが入ってる
        minamino.each((index,tr) => {
            let row = {}
            row.leave_campus = obj(tr).children().eq(0).text()
            row.arrive_station = obj(tr).children().eq(1).text()
            row.arrive_campus = obj(tr).children().eq(2).text()

            table.push(row)
        })
        return table
    })
}

function getTableJson(station, type) {
    /*
    station : minamino/hachioji/dormitory
    type    : weekday/sat
    */
    const stations = ['minamino', 'hachioji', 'dormitory']
    const types = ['weekday', 'sat']

    let url = null
    let tableIndex = null

    if (typeof(station) == 'string' && typeof(type) == 'string' && isContain(station, stations) && isContain(type, types)) {
        switch (type){
            case 'weekday':
                url = 'http://www.teu.ac.jp/campus/access/2017_kihon-a_bus.html'
                break
            case 'sat':
                url = 'http://www.teu.ac.jp/campus/access/2017_kihon-b_bus.html'
                break
        }

        switch (station) {
            case 'minamino':
                tableIndex = 0
                break
            case 'hachioji':
                tableIndex = 1
                break
            case 'dormitory':
                tableIndex = type == 'weekday' ? 2 : null
        }

        const json = JSON.stringify(getTable(url, tableIndex))
        return json

        
    } else {
        //error
        console.log('error')
        return 'error'
    }
}

function isContain (string, array) {
    // stringはarrayの中に含まれているか
    for (let i = 0; i < array.length; i++ ) {
        if (array[i] == string) {
            return true
        }
    }
    return false
}

console.log(getTableJson('minamino','weekday'))
