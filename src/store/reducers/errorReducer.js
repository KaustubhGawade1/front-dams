const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryError: null,
    btnLoader: false,
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };
        case "BUTTON_LOADER":
            return {
                    ...state,
                    btnLoader: true,
                    errorMessage: null,
                    
                };
        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                btnLoader: false,
               
            };
        case "IS_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                btnLoader: false,
                
            }
       

        default:
            return state;
    }  
};