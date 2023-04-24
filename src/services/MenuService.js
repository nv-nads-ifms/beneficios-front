import { getData } from "../api/api";

const MENU_API_BASE_URL = "/menus";

class MenuService {
    
    getMenus() {
        return getData(MENU_API_BASE_URL+"/list");
    }
    
}

export default new MenuService();