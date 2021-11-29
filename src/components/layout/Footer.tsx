import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

const Footer = () => {
  return (
    <footer className='bg-white'>
      <div className='py-12  md:flex md:items-center md:justify-between layout'>
        <div className='flex justify-center space-x-6 md:order-2'>
          <UnstyledLink href='/'>
            <span className='sr-only'>Silvery</span>
            <div className='w-12 h-12'>
              <NextImage
                src='/images/logo.png'
                alt='Logo'
                height='1200'
                width='1200'
                className='w-full h-full'
              />
            </div>
          </UnstyledLink>
        </div>
        <div className='mt-8 md:mt-0 md:order-1'>
          <p className='text-base text-center text-gray-400'>
            &copy; 2020 Workflow, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
