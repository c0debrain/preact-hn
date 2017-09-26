import {h, Component} from 'preact';
import WithData from '../../core/withData.js';
import GetItems from '../../core/api/items.js';
import LoadingView from '../../core/loadingView.js';
import Comments from './comments.js';
import Text from './text';

import styles from './item.css';

function ItemView({matches: {id}, data}) {
  if (!data || data === null) {
    return <LoadingView />;
  }

  const thisId = parseInt(id, 10);
  const {url, title, score, by, descendants=0, text} = data[thisId];
  const commentText = descendants > 1 ? 'comments' : 'comment';
  return (
    <div class={styles.wrapper}>
      <article class={styles.article}>
        <h1><a href={url} class={styles.outboundLink}>{title}</a></h1>
        {url && <small class={styles.hostname}>({new URL(url).hostname})</small>}
        <p class={styles.byline}>{score} points by <a href={`/user/${by}`} class={styles.link}>{by}</a></p>
        <Text text={text} />
      </article>
      {descendants > 0 && (
        <div class={styles.comments}>
          <h2 class={styles.numberOfComments}>{`${descendants} comment${descendants > 1 && "s"}`}</h2>
          <Comments root={thisId} />
        </div>
      )}
    </div>
  );
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.ItemViewWithData = this.ItemViewWithData.bind(this);
  }
  
  ItemViewWithData(data) {
    return <ItemView data={data} {...this.props} />;  
  }

  render({matches}) {
    return <WithData source={GetItems} values={{keys: [matches.id]}} render={this.ItemViewWithData} />;
  }
}