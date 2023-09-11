import React from 'react'

export default function Message() {
  return (
    <div className='border-2  flex justify-center items-center w-full h-full'>
        <div className='border-2 flex justify-start items-start w-fit h-full'>
            <h1 className='m-2 bg-black rounded-full w-12 h-12'></h1>
        </div>
        <div className='border-2 flex flex-col justify-center items-center w-full h-full'>
            <div className='border-2 flex  justify-start items-center w-full h-[5%] gap-2'>
                <h1 className='text-xs text-gray-200 mt-auto'>Juan Facundo Tam</h1>
                <h3 className='text-[0.6rem] text-gray-400 mt-auto'>19/10/2023 19:30</h3>
            </div>
            <div className='border-2 text-[0.8rem] flex flex-col justify-start items-start w-full h-full gap-y-1'>
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid nam eius quia eaque qui nulla corporis molestiae perspiciatis dolore facilis, officia vitae, sunt odit ea, vel tenetur ut eligendi. Velit!</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero fugit vitae iure optio nobis provident nostrum eaque voluptate ipsum vero nam, ratione obcaecati voluptas minus voluptatibus, sunt, distinctio incidunt laboriosam! Numquam, error ipsa? Quaerat rerum quibusdam nobis assumenda aliquid voluptates.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi officiis aperiam numquam harum quibusdam vel.</p>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis, quam?</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas eum nisi cumque inventore modi possimus beatae id eaque totam iste doloribus aliquid, veniam quas quam vitae repellat facere ipsa odio repudiandae quis in labore asperiores!</p>
            </div>
        </div>
    </div>
  )
}
