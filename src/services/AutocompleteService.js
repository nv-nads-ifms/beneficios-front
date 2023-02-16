import { getData } from "../api/api";
const LOGRADOURO_API_BASE_URL = "/logradouro-view";

class AutocompleteService {

    getPlacePredictions(request) {

        return getData(LOGRADOURO_API_BASE_URL + '?logradouro=' + request.input);

    }
}

export default new AutocompleteService();