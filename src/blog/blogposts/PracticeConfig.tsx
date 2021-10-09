import { blogPractiseConfig } from "../ArticleData/blogPosts";
import { BlogCodeSnippet } from "../components/BlogCodeSnippet";
import { BlogCopyPaste } from "../components/BlogCopyPaste";
import { BlogPostArticle } from "../components/BlogPostArticle";
import { EzoicPlaceholder } from "../../shared-components/adunits/EzoicPlaceholder";
import { AdUnitAdSense } from "../../shared-components/adunits/Adsense";

export const PractiseConfigBlogPost = () => {
  return (
    <>
      <BlogPostArticle data={blogPractiseConfig}>
        <p>
          If you are in a hurry copy-paste the two commands below into your
          console. Or read on to set it up properly.
        </p>
        <p>
          <em>
            Split up in two; since there is a character limit when pasting in
            commands in the console.
          </em>
        </p>

        <BlogCopyPaste
          value={
            "sv_cheats 1;bot_kick;mp_limitteams 0;mp_autoteambalance 0;mp_maxmoney 60000;mp_startmoney 60000;mp_buytime 9999;mp_buy_anywhere 1;mp_freezetime 0;mp_roundtime 60;mp_roundtime_defuse 60;mp_respawn_on_death_ct 1;mp_respawn_on_death_t 1;sv_infinite_ammo 1"
          }
        />
        <BlogCopyPaste
          value={
            "sv_grenade_trajectory 1;sv_grenade_trajectory_time 15;sv_showimpacts 1;sv_showimpacts_time 10;ammo_grenade_limit_total 5;mp_warmup_end;mp_restartgame 1"
          }
        />

        <div className="a-tag">
          <EzoicPlaceholder id="198" />
        </div>

        <h2>The config</h2>
        <BlogCodeSnippet
          code={
            "sv_cheats 1\nbot_kick\nmp_limitteams 0\nmp_autoteambalance 0\nmp_maxmoney 60000\nmp_startmoney 60000\nmp_buytime 9999\nmp_buy_anywhere 1\nmp_freezetime 0\nmp_roundtime 60\nmp_roundtime_defuse 60\nmp_respawn_on_death_ct 1\nmp_respawn_on_death_t 1\nsv_infinite_ammo 1\nsv_grenade_trajectory 1\nsv_grenade_trajectory_time 15\nsv_showimpacts 1\nsv_showimpacts_time 10\nammo_grenade_limit_total 5\nmp_warmup_end\nmp_restartgame 1"
          }
        />

        <div className="a-tag">
          <EzoicPlaceholder id="189" />
        </div>

        <h2>What does the config do?</h2>
        <h3>Basics</h3>
        <p>
          Increases the round times to 60 minutes and gives you a lot of money
          and infinite ammo. You can then shoot and throw nades without needing
          to buy new ones.
        </p>
        <p>
          It also makes you or anyone else on the server respawn if they die. So
          you don&apos;t have to write <em>mp_restartgame 1</em> if someone
          accidentally dies. Removes any bots on the server and eliminates any
          freeze time.
        </p>
        <p>Removes any bots on the server and removes any freezetime </p>
        <h3>Nade specific</h3>
        <p>
          Enabled nade trajectories for nades, so you can see the path the nades
          you throw takes.
        </p>
        <h3>Other</h3>
        <p>
          Enables impacts (red marking where you shoot), so you can test out
          wall bangs and see if bullets can penetrate walls.
        </p>

        <h2>Useful commands while practising</h2>
        <p>
          Here are some of the commands I find most helpful while I&apos;m
          practising offline.
          <br /> Replace X with whatever key you prefer.
          <br />
          If you are struggling to find the name of a key on your keyboard, use{" "}
          <a
            href="http://csgobindsgenerator.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            this tool
          </a>
          .
        </p>

        <div className="a-tag">
          <EzoicPlaceholder id="190" />
        </div>

        <h3>1. Fly command</h3>
        <p>Allows you to fly freely in the air.</p>
        <BlogCodeSnippet code="bind X noclip" />

        <h3>2. Simulate grenade throw</h3>
        <p>
          Hold your smoke/flash/molly in your hand, then press the bind. The
          game will simulate where the nade will go. There is no need actually
          to throw the nade.
        </p>
        <p>
          This is very useful if you&apos;re trying to find a pixel perfect
          smoke.
        </p>

        <BlogCodeSnippet code="bind X cl_sim_grenade_trajectory" />

        <h3>3. Preview grenade trajectory</h3>
        <p>
          Shows a line where the nade will go. When enabled, it will show you
          the nade trajectory only when you hold down your mouse button.
        </p>
        <BlogCodeSnippet code="bind X cl_grenadepreview" />
        <h3>4. Rethrow last grenade</h3>
        <p>
          Throws the last nade you threw. Extremely useful to test out pop
          flashes. Throw the flash, then stand in a spot and press the bind. You
          can then test out if someone in that spot will get flashed.
        </p>
        <BlogCodeSnippet code="bind X sv_rethrow_last_grenade" />

        <AdUnitAdSense />
      </BlogPostArticle>
      <style jsx>{`
        .a-tag {
          margin: 30px 0px;
        }
      `}</style>
    </>
  );
};
