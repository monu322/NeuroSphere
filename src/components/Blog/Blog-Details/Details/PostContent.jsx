/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';
import Link from 'next/link';

const PostContent = ({ SingleBlog }) => {
  return (
    <div className="content pt-20">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="cont">
            <div className="spacial">
             {SingleBlog?.postContent?SingleBlog.postContent.map((content)=>{
               return(
                <>
                  <h3>{content.heading}</h3>
                  <p>{content.paragraphs}</p> 
                   {content.images?content.images.map((img)=>{
                    return(
                      <>
                       <div className='img p-4'>
                        <img key={content.id}
                        className="img-sec"
                        src = {img}
                        alt = {content.heading}
                        />
                       </div>
                      </>
                      )
                   }):""}
                </>
              )
             }):"" }
           </div>

            <ul>
              <li><span>01</span> Integer in volutpat libero.</li>
              <li><span>02</span> Vivamus maximus ultricies pulvinar.</li>
              <li><span>03</span> priorities that will pop up in any particular month.</li>
              <li><span>04</span> We all intend to plan ahead.</li>
              <li><span>05</span> The main component of a healthy env for self esteem.</li>
            </ul>

            <div className="quotes text-center">
              <p>
                Never ever think of giving up. Winners never quit and quitters never win. Take all negative words out of your mental dictionary and focus on the solutions with utmost conviction and patience. The battle is never lost until you’ve abandon your vision.
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-10">
                  <img src={SingleBlog.img} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-10">
                  <img src={SingleBlog.img} alt="" />
                </div>
              </div>
            </div>
            <p>
              We all intend to plan ahead, but too often let the day-to-day minutia get in the way of making a calendar for the year. Sure, you can’t know every detail to anticipate. Heck, you can’t know half the priorities that will pop up in any particular month. But you can plan for big picture seasonality, busy-times, and events.
            </p>
            <div className="share-info">
              <div className="social">
                <Link href="#0">
                  <a><i className="fab fa-facebook-f"></i></a>
                </Link>
                <Link href="#0">
                  <a><i className="fab fa-twitter"></i></a>
                </Link>
                <Link href="#0">
                  <a><i className="fab fa-behance"></i></a>
                </Link>
              </div>
              <div className="tags">
                {
                  SingleBlog.tags.map((tag, idx) => (
                    <Fragment key={idx}>
                      <Link href="#0">
                        <a>{ tag }</a>
                      </Link>
                      { idx !== SingleBlog.tags.length - 1 && <>, </> }
                    </Fragment>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="author">
            <div className="author-img">
              <img src={SingleBlog.author.img} alt="" />
            </div>
            <div className="info">
              <h6><span>author :</span> { SingleBlog.author.name }</h6>
              <p>
                { SingleBlog.author.brief }
              </p>
              <div className="social">
                <Link href="#0">
                  <a><i className="fab fa-facebook-f"></i></a>
                </Link>
                <Link href="#0">
                  <a><i className="fab fa-twitter"></i></a>
                </Link>
                <Link href="#0">
                  <a><i className="fab fa-behance"></i></a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostContent