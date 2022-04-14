const uid = '4325844'
const cookie = "b_lsid=AD8AD771_17DD7CBCCEE;CURRENT_QUALITY=16;CURRENT_FNVAL=2000;CURRENT_BLACKGAP=1;b_ut=5;i-wanna-go-back=-1;DedeUserID=4325844;DedeUserID__ckMd5=8da86e1e4d42dec2;SESSDATA=c88e2146%2C1654872803%2Cc694e%2Ac1;bili_jct=13870fe34e8283cd450d424618f249b7;sid=7s2dn9cl;_uuid=FF56352E-E5AC-210107-EC54-421391E71F4923679infoc;buvid_fp=59B45865-A46E-4DB2-8AFE-25482579EBF4143086infoc;LIVE_BUVID=AUTO5416080082352601;rpdid=|(J~JJJum|um0J'uY|~u)llRY;buvid3=59B45865A46E-4DB2-8AFE-25482579EBF4143086infoc;"

const default_headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36",
    "cookie": cookie
}

async function get_tags() {
    let tag_url = 'https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=' + uid
    let req = new Request(tag_url)

    req.method = 'GET'
    req.headers = default_headers

    const res_raw = await req.loadString()
    const res = JSON.parse(res_raw)
        //console.log(res.data)
        //console.log(res.message)
        //   const count = res.data.count
    return res.data.list
}

async function get_ids_list(mid, current_page) {
    let ids_url = 'https://api.bilibili.com/x/v3/fav/resource/ids?media_id=' + mid
    let req = new Request(ids_url)

    req.method = 'GET'
    req.headers = default_headers

    const res_raw = await req.loadString()
    const res = JSON.parse(res_raw)
        //console.log(res)
        //console.log(res.message)
    const data = res.data;
    //console.log(data)
    let ids = ''
    const start = (current_page - 1) * page_size
    const end = (current_page) * page_size
    for (var i = start; i < data.length && i < end; i++) {
        //console.log(i + ' ' +data.length+ ' ' + end)
        let id = data[i].id
        if (i != 0) ids += ','
        ids += id + ':2'
            //console.log(ids)
    }
    //console.log(ids)
    let content_url = 'https://api.bilibili.com/x/v3/fav/resource/infos?resources=' + ids
    let req2 = new Request(content_url)

    req2.method = 'GET'
    req2.headers = default_headers

    const res_raw2 = await req2.loadString()
    const res2 = JSON.parse(res_raw2)
        //console.log(res2)
        //   console.log(res)
    console.log(res2.data)
    return res2.data

}

function render_tags_page(list_page) {
    let table = new UITable;
    table.showSeparators = true;
    for (var i = 0; i < list_page.length; i++) {
        var row = new UITableRow()
        row.dismissOnSelect = false
        let titleCell = row.addText(
            list_page[i].title,
            list_page[i].media_count + (list_page[i].tip ? (' | ' + list_page[i].tip) : ''))
        row.height = 60
        row.cellSpacing = 0
        row.onSelect = (idx) => {
            const media_id = list_page[idx].id
            new Promise(function(resolve, reject) {
                resolve(get_ids_list(media_id, 1));
            }).then(function(page) {
                render_tag_page(media_id, page, 1, list_page[idx].media_count)
            })
            console.log(media_id)
        }
        table.addRow(row)
    }
    table.present(true);
}

function getTimeFormatted(time) {
    return (Math.floor(Math.floor(time / 60) / 60) ? Math.floor(Math.floor(time / 60) / 60) + ':' : '') + Math.floor(time / 60) % 60 + ':' + (time % 60 < 10 ? '0' : '') + time % 60
}

function render_tag_page(tag_id, list_page, current_page, total) {
    let table = new UITable;
    table.showSeparators = true;
    for (var i = 0; i < list_page.length; i++) {
        var row = new UITableRow()
        row.dismissOnSelect = false
        let coverCell = row.addImageAtURL(list_page[i].cover)
        let titleCell = row.addText(
            list_page[i].title,
            list_page[i].upper.name + ' | ' + getTimeFormatted(list_page[i].duration) + ' | 弹幕：' + list_page[i].cnt_info.danmaku + ' | 播放：' + list_page[i].cnt_info.play)
        coverCell.widthWeight = 25
        titleCell.widthWeight = 75
        row.height = 90
        row.cellSpacing = 0
        row.onSelect = (idx) => {
            const media_id = list_page[idx].id
            open_fenpi_list(list_page[idx], media_id)
            console.log(media_id)
        }
        table.addRow(row)
    }
    const page_count = Math.ceil(total / page_size)
    if (page_count > current_page) {
        let end_row = new UITableRow()
        let btn = end_row.addButton('第' + current_page + '页，共' + page_count + '页 | 下一页 〉')
        btn.onTap = () => {
            console.log(tag_id)
            new Promise(function(resolve, reject) {
                resolve(get_ids_list(tag_id, current_page + 1));
            }).then(function(next_page) {
                render_tag_page(tag_id, next_page, current_page + 1, total)
            })
        }
        table.addRow(end_row)
    }
    table.present(true);

}

function render_follow_page(list_page) {
    let table = new UITable;
    table.showSeparators = true;
    for (var i = 0; i < list_page.length; i++) {
        var row = new UITableRow()
        row.dismissOnSelect = false
        let coverCell = row.addImageAtURL(list_page[i].face)
        let titleCell = row.addText(
            list_page[i].uname,
            list_page[i].sign)
        coverCell.widthWeight = 25
        titleCell.widthWeight = 75
        row.height = 90
        row.cellSpacing = 0
        row.onSelect = (idx) => {
            const media_id = list_page[idx].mid
            open_episodes_list(media_id, 1, list_page[idx]);
            console.log(media_id)

        }
        table.addRow(row)
    }
    let end_row = new UITableRow()
    let btn = end_row.addButton('下一页 〉')
    btn.onTap = () => {

        new Promise(function(resolve, reject) {
            resolve(get_follow_list(++current_page));
        }).then(function(next_page) {
            render_follow_page(next_page)
        })
    }
    table.addRow(end_row)
    table.present(true);

}
async function open_episodes_list(eid, page_number, header_content) {
    let url = 'https://api.bilibili.com/x/space/arc/search?mid=' + eid + '&ps=30&tid=0&pn=' + page_number + '&keyword=&order=pubdate&jsonp=jsonp'
        //   console.log(url)
    let req = new Request(url)
    req.method = 'GET'
    req.headers = default_headers

    const res_raw = await req.loadString()
    const res = JSON.parse(res_raw)
    console.log(res)
    const status = res.message
    const list = res.data.list.vlist
    const total = res.data.page.count
    page_number = res.data.page.pn
    const page_size = res.data.page.ps
        //console.log(list)

    let table = new UITable;
    table.showSeparators = true;

    let row = new UITableRow()
    row.isHeader = true
    let imageCell = row.addImageAtURL(header_content.face)
    let titleCell = row.addText(header_content.uname, header_content.sign)
    imageCell.widthWeight = 30
    titleCell.widthWeight = 70
    row.height = 100
    row.cellSpacing = 15
        //        row.onSelect = (idx) => {
        //         
        //        }  
    table.addRow(row)

    for (var i = 0; i < list.length; i++) {
        //         console.log(list[i]) 
        let row = new UITableRow()
        row.dismissOnSelect = false
        let imageCell = row.addImageAtURL(list[i].pic)
        let titleCell = row.addText(list[i].title, list[i].length + ' | 评论：' + list[i].comment + ' | 播放：' + list[i].play)
        imageCell.widthWeight = 35
        titleCell.widthWeight = 65
        row.height = 150
        row.cellSpacing = 5
        row.onSelect = (idx) => {
            const aid = list[idx - 1].aid
            console.log(aid)
            open_fenpi_list(list[idx - 1], aid)
                // 			let w = new WebView();
                // 			w.loadURL(red_url);
                // 			w.present(true);

            //https://api.bilibili.com/x/player/playurl?cid=271764916&bvid=BV1bh411f7jU&qn=0&type=&otype=json&fourk=1&fnver=0&fnval=80&session=7151e1bf0d520aac4b5caddb4ef11727
        }
        table.addRow(row)
    }
    const page_count = Math.ceil(total / page_size)
    if (page_number < page_count) {
        let end_row = new UITableRow()
        let btn = end_row.addButton('第' + page_number + '页，共' + page_count + '页 | 下一页 〉')
        btn.onTap = () => {
            open_episodes_list(eid, page_number + 1, header_content)
        }
        table.addRow(end_row)
    }
    table.present();
}

async function open_fenpi_list(header_content, aid) {
    let url = 'https://api.bilibili.com/x/player/pagelist?aid=' + aid + '&jsonp=jsonp'

    let req = new Request(url)
    req.method = 'GET'
    req.headers = default_headers

    const res_raw = await req.loadString()
    const res = JSON.parse(res_raw)
    console.log(res)
    const status = res.message
    const list = res.data

    let table = new UITable;
    table.showSeparators = true;

    let row = new UITableRow()
    row.isHeader = true
    let imageCell = row.addImageAtURL(header_content.cover)
    let titleCell = row.addText(header_content.title, header_content.intro)
    imageCell.widthWeight = 40
    titleCell.widthWeight = 60
    row.height = 240
    row.cellSpacing = 15
        //        row.onSelect = (idx) => {
        //         
        //        }  
    table.addRow(row)

    for (var i = 0; i < list.length; i++) {
        //         console.log(list[i]) 
        let row = new UITableRow()
        row.dismissOnSelect = false
        let imageCell = row.addImageAtURL(list[i].first_frame)
        let titleCell = row.addText(list[i].page + '. ' + list[i].part)
        imageCell.widthWeight = 30
        titleCell.widthWeight = 70
        row.height = 120
        row.cellSpacing = 5
        row.onSelect = (idx) => {
            const cid = list[idx - 1].cid
            console.log(cid)
            open_video(aid, cid)
        }
        table.addRow(row)
    }
    table.present();
}

async function open_video(aid, cid) {
    if (video_method == 0) {
        const red_url = 'Alook://https://www.bilibili.com/blackboard/newplayer.html?playlist=true&playlist_order=sequential&musth5=1&noEndPanel=0&crossDomain=1&autoplay=1&aid=' + aid + '&page=1'
        Safari.open(red_url)
    } else if (video_method == 1) {

        const type = 112
            // 16 流畅360p mp4
            // 32 清晰480p flv480
            // 64 高清720p flv720
            // 80 高清1080p flv
            // 112 高码率1080p hdflv2
            // 120 超清4K hdflv2
        const url = 'Alookplayer://https://api.bilibili.com/x/player/hls/master.m3u8?aid=' + aid + '&cid=' + cid + '&device_type=0&dolby=0&fnval=0&fnver=0&force_host=2&platform=&qn=' + type + '&qn_category=0&request_type=0'
        Safari.open(url)
    } else if (video_method == 2) {

    } else if (video_method == 3) {

    } else {
        //       TODO
    }
}

async function get_live_src(roomid) {
    live_source_url = 'https://api.live.bilibili.com/room/v1/Room/playUrl?cid=' + roomid + '&platform=h5&otype=json&quality=4'
    let src_req = new Request(live_source_url)
    src_req.method = 'GET'
    src_req.headers = default_headers

    const src_res_raw = await src_req.loadString()
    const src_res = JSON.parse(src_res_raw)
        //   console.log(src_res)
    const src = src_res.data.durl[0].url
    return src
}

async function render_live_widget(list_page, type) {
    let grad = new LinearGradient()
    grad.colors = [new Color('#53B3EC', 0.4), Color.dynamic(new Color('#ffffff', 0), new Color('#000000', 0))]
    grad.locations = [0, 0.8]
    let w = new ListWidget();
    w.backgroundGradient = grad
    let list_page_length = list_page.length;
    let limit_length = 1
    if (type == 'large') {
        limit_length = 7
    } else if (type == 'medium') {
        limit_length = 3
    } else if (type == 'small') {
        limit_length = 1
    } else if (type == 'extraLarge') {
        limit_length = 7
    }
    for (var i = 0; i < limit_length; i++) {
        let face_url = list_page[i].face
        let req = new Request(face_url)
        req.method = 'GET'
        req.headers = default_headers
        const res_raw = await req.loadImage()
        if (i != 0)
            w.addSpacer(7)
        let s = w.addStack()
        let face = s.addImage(res_raw)
        s.addSpacer(5)
        face.cornerRadius = 20
        s.addSpacer(5)
        let ts = s.addStack()
        ts.layoutVertically()
        let title_font_style = Font.boldRoundedSystemFont(16)
        let title = ts.addText(list_page[i].title)
        title.font = title_font_style

        let uname_font_style = Font.regularSystemFont(12)
        let uname = ts.addText(list_page[i].uname)
        uname.font = uname_font_style
        uname.textOpacity = 0.7
            // s.backgroundImage = cov_res_raw
        s.url = 'Alookplayer://' + list_page[i].link
    }
    Script.setWidget(w);
    if (type == 'large') {
        w.presentLarge()
    } else if (type == 'medium') {
        w.presentMedium()
    } else if (type == 'small') {
        w.presentSmall()
    } else if (type == 'extraLarge') {
        w.presentExtraLarge()
    } else {
        w.presentSmall()
    }

}