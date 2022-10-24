import {getDataLocal} from '../storage';
import {prod_domain} from './api_key';
import {ErrorCode} from './error_code';
import {HttpMethod} from './http_method';

export const DOMAIN_KEY = 'DOMAIN_KEY';

function buildQueryString(objectParam: any) {
  let query = Object.keys(objectParam)
    .map(param => param + '=' + objectParam[param])
    .join('&');

  return query;
}

async function getHeader() {
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return header;
}

async function raw(
  url: string,
  params: any,
): Promise<{error?: any; res?: any}> {
  try {
    const domain = await getDataLocal(DOMAIN_KEY);
    let res = await fetch((!!domain ? domain : prod_domain) + url, params).then(
      (response: Response) => {
        return response.json();
      },
    );
    // console.log(domain + url, params);
    if (!!res && !res.errorCode) {
      return {
        res: res,
      };
    } else {
      return {
        error: res.msg ?? 'Unknown Error',
      };
    }
  } catch (err) {
    console.warn(url, params, err);
    return {
      error: `${err}`,
    };
  }
}

const patch = async (api: string, data: any) => {
  const headers = await getHeader();
  return raw(api, {
    body: JSON.stringify(data),
    headers: headers,
    method: HttpMethod.PATCH,
  });
};
const post = async (api: string, data: any) => {
  const headers = await getHeader();
  return raw(api, {
    body: JSON.stringify(data),
    headers: headers,
    method: HttpMethod.POST,
  });
};

const postFormData = async (
  api: string,
  data: FormData,
  full_access?: boolean,
) => {
  const headers = await getHeader();
  return raw(api, {
    body: data,
    headers: headers,
    method: HttpMethod.POST,
  });
};

const put = async (api: string, data: any) => {
  const headers = await getHeader();
  return raw(api, {
    body: JSON.stringify(data),
    headers: headers,
    method: HttpMethod.POST,
  });
};

const get = async (api: string, data: any) => {
  const query = data ? buildQueryString(data) : '';
  const headers = await getHeader();
  let url = api;
  if (!!query) {
    url = api + '?' + query;
  }
  return raw(url, {
    headers: headers,
    method: HttpMethod.GET,
  });
};

const remove = async (api: string, data: any) => {
  const headers = await getHeader();
  return raw(api, {
    body: JSON.stringify(data),
    headers: headers,
    method: HttpMethod.DELETE,
  });
};

export {post, put, get, remove, postFormData, patch};
