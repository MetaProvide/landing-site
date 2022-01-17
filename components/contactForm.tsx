import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export default function ContactForm () {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('A Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        subject: Yup.string()
            .required('Subject is required'),
        message: Yup.string()
            .required('Message is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) }

   // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data: any) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

  return (
  <div className="lg:w-2/3 md:w-1/1 mx-auto">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="last-name">Name</label>
          <input type="text" {...register('name')} name="name" className={`form-input px-3 py-2 rounded-md ${errors.name ? 'border-red-700' : ''}`} />
          <div className="text-xs text-red-700">{errors.name?.message}</div>
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} name="email" className={`form-input pl-8 pr-3 py-2 rounded-md ${errors.email ? 'border-red-700' : ''}`}  />
          <div className="absolute inset-y-0 left-1 top-6 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
          </div>
          <div className="text-xs text-red-700">{errors.email?.message}</div>
        </div>
        <div className="relative flex flex-col col-span-2">
          <label htmlFor="subject">Subject</label>
          <input type="text" {...register('subject')} name="subject" className={`form-input pl-8 pr-3 py-2 rounded-md ${errors.subject ? 'border-red-700' : ''}`}  />
          
          <div className="absolute inset-y-0 left-1 top-6 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
            </svg>
          </div>

          <div className="text-xs text-red-700">{errors.subject?.message}</div>
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="subject">
            <div className="flex align-items">
              Message
              <span className="ml-auto opacity-75">A sentence or two is just fine</span>
            </div>
          </label>
          <textarea 
            maxLength={500} 
            rows={4}
            {...register('message')}
            name="subject" 
            className={`form-input px-3 py-2 rounded-md ${errors.subject ? 'border-red-700' : ''}`} 
            />
          <div className="text-xs text-red-700">{errors.message?.message}</div>
        </div>
        
      </div>
      <div className="flex justify-center py-4"> 
        <button type="submit" className="w-1/3 bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500">
          Contact us
        </button>
      </div>
    </form>
  </div>
);
}