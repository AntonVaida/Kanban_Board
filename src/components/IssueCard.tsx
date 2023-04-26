import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Issues } from "../types/Issues";
import { colors } from "../utils/colors";
import { Avatar, Typography } from "@mui/material";
import { normalizeIssuesText } from "../utils/normalizeIssuesText";
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: '80%',
    height: 130,
    backgroundColor: colors.MAIN_BACKGROUND,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 15,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  userBlock: {
    width: '35%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  issuesContainer: {
    width: '65%',
    height: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    marginTop: 10,
    fontSize: 13,
  },
  issueTitle: {
    width: '100%',
    wordBreak: 'break-word',
    fontSize: 13,
  },
  containerComments: {
    display: 'flex',
    width: '10vw',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsText: {
    display: 'inline-block',
    paddingLeft: 10,
    fontSize: 11,
  }
}))

type Props = {
  issues: Issues | null,
  innerRef?: React.Ref<HTMLDivElement>;
}

export const IssueCard:React.FC<Props> = ({issues, innerRef, ...rest}) => {
  const classes = useStyles();

  return (
    <Box className={classes.cardContainer} ref={innerRef} {...rest}>
      <Box className={classes.userBlock}>
        <Avatar
          sx={{ bgcolor: colors.RED_FOR_BUTTON }}
          alt={issues?.user?.login}
          src={issues?.user?.avatar_url}
        />
        <Typography
          variant="subtitle2"
          className={classes.userName}
        >
          {issues?.user?.login}
        </Typography>
      </Box>
      <Box className={classes.issuesContainer}>
        <Typography
          variant="subtitle2"
          className={classes.issueTitle}
        >
           {issues?.title ? normalizeIssuesText(issues?.title) : 'not dicription ;('}
        </Typography>
        <Box className={classes.containerComments}>
          <CommentRoundedIcon 
            style={{
              color: colors.FONTS_COLOR,
              height: 15,
              width: 15
            }}
          />
          <Typography
            variant="subtitle2"
            className={classes.commentsText}
          >
            {`Comments: ${issues?.comments}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}