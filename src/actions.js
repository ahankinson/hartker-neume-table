import "whatwg-fetch"
export const RECEIVE_ANNOTATIONS = "RECEIVE_ANNOTATIONS";
export const SWITCH_ACTIVE_SELECTION = "SWITCH_ACTIVE_SELECTION";


export function fetchAnnotations ()
{
    return (dispatch) =>
    {
        return fetch('/annotations.json')
                .then((response) => {
                    return response.json()
                })
                .then((payload) => {
                    dispatch(receiveAnnotations(payload))
                })
    }
}

export function receiveAnnotations (payload)
{
    return {
        type: RECEIVE_ANNOTATIONS,
        payload
    }
}

export function switchActiveSelection (payload)
{
    return {
        type: SWITCH_ACTIVE_SELECTION,
        payload
    }
}
