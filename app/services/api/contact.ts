import { post } from '@/app/api/api';
import toast from 'react-hot-toast';

type Locale = 'en' | 'sr';

export const sendContactRequest = async (formData: any, locale: Locale) => {

  const response = await post(
    '/b2c/contact/contact_page?form_section=contact_page',
    formData,
  );

  const messages: Record<Locale, string> = {
    en: 'Success',
    sr: 'Poslato',
  };

  if (response?.success) {
    toast.success(messages[locale]);
  } else {
    const errorMessages = response?.payload?.fields?.map(
      (field: { name: string; error: string }) => field.error,
    );

    if (errorMessages && errorMessages.length > 0) {
      toast.error(errorMessages.join('\n'));
    } else {
      toast.error(response.message);
    }
  }
};
