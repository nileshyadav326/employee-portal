import api from './queries';

const logerror = (error) => {
  api.logError(error);
} 

export const listEmployee = async () => {
  const res = await api.listEmployee().catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};


export const addEmployee = async (data) => {
  const res = await api.addEmployee(data).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });
  const val = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const updateEmployee = async (data) => {
  const res = await api.updateEmployee(data).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });
  const val = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const deleteEmployee = async (data) => {
  console.log(data);
  const res = await api.deleteEmployee(data).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });
  const val = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const uploadPhoto = async (file) => {
  const res = await api.uploadPhoto(file).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });
  const val = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
