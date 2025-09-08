// Learn more at developers.reddit.com/docs
import {Devvit, StateSetter, useAsync, useState} from '@devvit/public-api';

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Brew Some Beer',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center" backgroundColor="Global-Black">
          <text size="large" color="Global-White">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

type Options = 'One' | 'Two' | 'Three' | 'Four';

interface ToggleProps {
    title: string,
    value: Options,
    activeToggle: Options,
    setActiveToggle: StateSetter<Options>
}
const Toggle = (props: ToggleProps) => {
    const isActive = props.activeToggle == props.title;
    return (
        <hstack
            backgroundColor={isActive ? 'AlienBlue-500' : 'PureGray-500'}
            grow
            padding="small"
            alignment="middle center"
            onPress={() => props.setActiveToggle(props.value)}
        >
            <text wrap>
                {props.title}
            </text>
        </hstack>
    );
}

const TcpodPage = () => {
    const [activeToggle, setActiveToggle] = useState<Options>('One');
    return (
            <vstack width="100%" height="100%"> {/* Add grow here */}
                <vstack width="100%" padding="small"> {/* Add grow here */}
                    <hstack width="100%" gap="small">
                        <Toggle title="1. Reset (hstack)" value="One" activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
                        <Toggle title="2. Mid Auto No-Border No-Bg" value="Two" activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
                        <Toggle title="3. Tall Fixed Thin Border" value="Three" activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
                        <Toggle title="4. Short Fixed Thick Border" value="Four" activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
                    </hstack>
                    <spacer size="small" />
                    <vstack width="75%" alignment="top center"> {/* Add grow here */}
                        {(() => {
                            switch (activeToggle) {
                                case "Two":
                                    return (<hstack>
                                        <text style="heading">2. Mid Auto No-Border No-Bg</text>
                                        <text wrap>This area has no props defined.</text>
                                        <text wrap>No width, height, border, background.</text>
                                        <text wrap>Grow is not ideal (shifts content below down far).</text>
                                    </hstack>);

                                case "Three":
                                    return (<hstack width="75%" height="175px" gap="small" padding="small" border="thin" cornerRadius="small" alignment="bottom center" borderColor="PureGray-500" backgroundColor="Yellow-800">
                                        <text style="heading">3. Tall Fixed Thin Border</text>
                                        <text wrap>This area has a fixed height of 175px, with a gray thin border and yellow background.</text>
                                        <text wrap>Switching back to #2, which does not specify a height or border, will continue to have the same height and border.</text>
                                    </hstack>);

                                case "Four":
                                    return (<hstack width="100%" height="50px" border="thick" borderColor="PureGray-500" backgroundColor="AlienBlue-800">
                                        <text style="heading">4. Short Fixed Thick Border</text>
                                        <text wrap>Fixed 50px height with thick border and blue background.</text>
                                    </hstack>);

                                case "One":
                                default:
                                    return (<vstack width="100%">
                                        <text style="heading">1. Reset</text>
                                        <text>This area is a vstack, which "resets" or replaces the hstack in the other toggles.</text>
                                    </vstack>);
                            }
                        })()}
                    </vstack>
                    <spacer size="small" />
                    <vstack width="100%" padding="small" border="thin" cornerRadius="small" borderColor="PureGray-300" backgroundColor="PureGray-800" >
                        <text color="Global-White" wrap>Changing to #3 or #4, then back to #2, the #2 hstack will have the properties of #3 and #4. Passing "undefined" or not specifying has the same result.</text>
                    </vstack>
                </vstack>
            </vstack>
    );
}

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Beach Brews Test',
  height: 'regular',
  render: (context) => {
    return (
        <TcpodPage />
    );
  },
});

export default Devvit;