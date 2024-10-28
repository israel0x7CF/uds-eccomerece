import React from 'react'
import { Store } from 'lucide-react'

type Props = {
  params: {
    slug: string
  }
}
type Params = Promise<{ slug: string[] }>
async function page({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <div className="bg-background dark:bg-background py-8">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-card dark:bg-card mb-4">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-1 px-4 py-3">
                  <button className="w-full flex items-center justify-center bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground py-2 px-4 rounded-full font-bold hover:bg-accent dark:hover:bg-accent">
                    <Store className="mr-2" /> {/* Adjust the spacing with `mr-2` */}
                    <span>Purchase</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-foreground dark:text-foreground mb-2">
              Product Name
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-muted-foreground dark:text-muted-foreground">
                  Price:
                </span>
                <span className="text-muted-foreground dark:text-muted-foreground">$29.99</span>
              </div>
              <div>
                <span className="font-bold text-muted-foreground dark:text-muted-foreground">
                  Availability:
                </span>
                <span className="text-muted-foreground dark:text-muted-foreground">In Stock</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-muted-foreground dark:text-muted-foreground">
                Select Color:
              </span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-primary dark:bg-primary mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-destructive dark:bg-destructive mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-accent dark:bg-accent mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-secondary dark:bg-secondary mr-2"></button>
              </div>
            </div>
            <div>
              <span className="font-bold text-muted-foreground dark:text-muted-foreground">
                Product Description:
              </span>
              <p className="text-muted-foreground dark:text-muted-foreground text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer
                euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus
                aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque ut
                erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum
                lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                tincidunt mi consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
