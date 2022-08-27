import webfox from './initialize';
const logError = (error) => {
  console.log(error,'==>>>API ERROR')
};


const exec = async (fn, params = null, error = null) => {
  const res = {
    data: null,
    error: null,
    syserror: null,
  };

  await fn(params)
    .then((response) => {
      res.data = response;
    })
    .catch((err) => {
      if (err.response) {
        res.error = err.response;
      } else if (err.request) {
        res.error = err.request;
      } else {
        res.error = err;
      }
    });

  return res;
};

export const listEmployee = () =>
  exec(() => {
    return webfox.get(`/listEmployee`);
});

export const addEmployee = (data) =>
  exec(() => {
    return webfox.post(`/addEmployee`, data);
});

export const updateEmployee = (data) =>
  exec(() => {
    return webfox.post(`/updateEmployee`, data);
});


export const deleteEmployee = (data) =>
  exec(() => {
    console.log(data,'==>>deleteEmployee')
    return webfox.delete(`/deleteEmployee`,{data : data});
});

export const uploadPhoto = (file) =>
  exec(() => {
    return webfox.post(`/uploadFile`,file,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })

});



export default {
  logError,
  listEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  uploadPhoto
}
