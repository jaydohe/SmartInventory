import { toast } from 'react-toastify';

export type errorsMessage = {
  key: string;
  messages: string[];
};

// export type errorsStatus = {
//   errors: errorsMessage[];
//   resultCode: number;
//   message: string;
// };

export const showToastErrors = (errors: any) => {
  console.log(errors);
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      // console.log(key, errors[key], errors['msg']);
      key === 'errors' &&
        errors[key].map((err: errorsMessage) =>
          err.messages.map((msg: string) => toast.error(`${err.key} - ${msg}`))
        ),
        key === 'msg' && toast.error(errors[key]);
    }
  }
};
