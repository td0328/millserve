let connection = require('../../database/connection');
module.exports={
    getMenus: async (response) => {
        let menus = [];
        let res = await connection.findList('menus', {'pid': '0'}, {'sort': 'asc'})
        for (let i in res) {
            let submenu = [];
            let submenu_res = await connection.findList('menus', {'pid': res[i].id}, {'id': 'asc'});
            for (let j in submenu_res) {
                submenu.push({
                    icon: submenu_res[j].icon,
                    title: submenu_res[j].title,
                    contents: submenu_res[j].contents,
                    filename: submenu_res[j].filename,
                    parameter: submenu_res[j].parameter,
                })
            }
            menus.push({
                icon: res[i].icon,
                title: res[i].title,
                submenu: submenu
            })
        }
        response.send(menus);
    }
}