const Footer = () => {
  return (
    <footer aria-labelledby='footer-heading' className='bg-white'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
        <div className='border-t border-gray-200 py-10'>
          <p className='text-sm text-gray-500'>
            Copyright &copy; 2021 PT Aneka Usaha Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
