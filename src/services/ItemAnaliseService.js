import { getData, postData } from "../api/api";

const ITEM_ANALISE_API_BASE_URL = "/item-analise";

class ItemAnaliseService {
        
    getItens(params) {
        return getData(ITEM_ANALISE_API_BASE_URL, params);
    }

    retirar(params) {
        return postData(ITEM_ANALISE_API_BASE_URL+"/retirar", params);
    }
}

export default new ItemAnaliseService();