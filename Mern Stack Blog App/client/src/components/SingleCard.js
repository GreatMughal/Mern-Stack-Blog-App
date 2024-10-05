import React from 'react'

const SingleCard = ({
  title = "hello",
  image,
  description = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsam iste mollitia at deserunt distinctio, quo eligendi est dicta expedita deleniti excepturi voluptas numquam ex accusamus ullam in delectus aliquid quod libero suscipit accusantium ea?",
  username = "john doe",
  createdAt = "25-06-24",
}) => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font p-5">
      <div className='w-ful flex items-center justify-between px-5 mb-10'>
        <h3 className='text-xl text-white font-bold'>{username}</h3>
        <h6 className='text-sm text-fray-400'>{createdAt}</h6>
      </div>
      <div className="container mx-auto flex px-5 items-center justify-center">
        <img className="lg:w-[40vw] md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={image ? image : "https://dummyimage.com/720x600"} />
        <div className="text-left lg:w-2/3 w-full px-10">
          <h1 className="font-black sm:text-4xl text-3xl mb-4 text-white">

            {title}
          </h1>
          <p className="leading-relaxed mb-8">{description}</p>

        </div>
      </div>
    </section>
  )
}

export default SingleCard

