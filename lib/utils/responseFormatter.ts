const ResponseJson = (identifier, data) => {

  let response: object = {}
  
  if (identifier == 'err') {
    let errData: object = {
      success: false,
      statusCode: 500,
      data: [],
      errorMessage: [{error: data}]
    }
    response = errData;
  } else {
    let successData: object = {
      success: true,
      statusCode: 200,
      data: data[0] == null ? [] : data,
      errorMessage: []
    }
    response = successData;
  }

  return response

}

export default ResponseJson