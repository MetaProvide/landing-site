/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export default function NewsLetterForm () {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
    });

    const formOptions = { resolver: yupResolver(validationSchema),  }

   // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data: unknown) {
 
        const {email} = data as { email:string };
        const body = JSON.stringify({email})

        fetch('http://localhost:3000/api/sendEmail', {method: 'POST', body: body})
          .then(res => console.log(res))
          .catch(err => console.log(err))
    }

  return (
    <form className="flex w-100 content-center justify-center lg:w-2/3 mx-auto mb-16" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col mr-4">
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} name="email" className={`form-input pl-8 pr-3 py-2 rounded-md ${errors.email ? 'border-red-700' : ''}`}  placeholder="your@email.com" />
          <div className="absolute inset-y-0 left-1 top-6 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
          </div>
          <div className="text-xs text-red-700">{errors.email?.message}</div>
        </div>
        
      <div className="flex justify-center align-end pt-5"> 
        <button type="submit" className="w-100 bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500">
          Sign up
        </button>
      </div>
    </form>
);
}