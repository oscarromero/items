const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } finally {
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

const handleError = (error) => {
  console.error(error);
  return new Response(error, {
    status: 500,
  });
};

const makeApiRequest = async (url, method, body, handleFn) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await handleFn(response);
  } catch (error) {
    return handleError(error);
  }
};

export const apiRequest = async (url, method, body) => {
  return await makeApiRequest(url, method, body, async (response) => {
    let data;
    try {
      data = await response.json();
    } finally {
      return data;
    }
  });
};

export const backendApiRequest = async (url, method, body) => {
  return await makeApiRequest(
    `${process.env.BACKEND_BASE_URL}${url}`,
    method,
    body,
    handleResponse
  );
};
