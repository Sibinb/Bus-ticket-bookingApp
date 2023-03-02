import React from 'react'
import { Progress } from 'antd';
import'../../styles/review.css'
function Review() {
  return (
    <div className='row reviews_div'>
    <div className="rating_progressbar col-10 col-md-5" style={{margin:'0px auto'}}>
    <h4 style={{alignItems:'center',justifyContent:'center',display:'inline-flex',color:'blue'}}>4.5 <i class="ri-star-s-fill"></i></h4>
    <br />
    <span className='text-secondary'>5<i class="ri-star-s-fill"></i></span>
    <br />
    <Progress percent={30}/>
    <span className='text-secondary'>4<i class="ri-star-s-fill"></i></span>
    <br />
    <Progress percent={20} />
    <span className='text-secondary'>3<i class="ri-star-s-fill"></i></span>
    <br />
    <Progress percent={10} />
    <span className='text-secondary'>2<i class="ri-star-s-fill"></i></span>
    <br />
    <Progress percent={25} />
    <span className='text-secondary'>1<i class="ri-star-s-fill"></i></span>
    <br />
    <Progress percent={15} />
    
    </div>
    <div className="reviews_section col-12 col-md-5" style={{margin:'0px auto'}}>
        <h4>Reviews</h4>
        <OneReview/>
        <OneReview/>
        <OneReview/>
    </div>
    </div>
  )
}


const OneReview=()=>{
    return(
        <div className='review_div'>
            <h5 className='review_heading'>Amal 4<i class="ri-star-s-fill"></i></h5>
            <div className='review_content'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Sed fugiat asperiores harum repellat. Iure illum non nobis
                nulla adipisci a. Aut voluptas maiores.
            </div>
        </div>
    )
}
export default Review