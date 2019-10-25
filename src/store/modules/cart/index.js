import { initStore,initApi } from '../../../utils/initStore';
const apiObj={
    main:"",
    deleteItem:"",
    getList:"",
    addData:"",
    getDetails:"",
    updateDate:""
};
initApi(apiObj);
const store = initStore();
store.actions
export default store