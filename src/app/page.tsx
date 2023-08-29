import { redirect } from 'next/navigation';

export default function Main() {
  // default go to login page
    redirect('/login');
}
