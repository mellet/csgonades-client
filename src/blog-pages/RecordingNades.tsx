import { recordingNades } from "../blog/ArticleData/blogPosts";
import { BlogCodeSnippet } from "../blog/components/BlogCodeSnippet";
import { BlogPostArticle } from "../blog/components/BlogPostArticle";

export const RecordingNadesBlogPost = () => {
  return (
    <>
      <BlogPostArticle
        data={recordingNades}
        authorName="kurczunek"
        authorAvatarURL="https://avatars.steamstatic.com/16c8e80b7d276a7e19977b7fc85fafc975372d23_medium.jpg"
      >
        <h2>Step 1: Finding the Perfect Lineup</h2>
        <p>
          The first step in creating an impressive nade submission is to find
          the perfect lineup. The good news is that your lineup doesn&apos;t
          have to be entirely original. You can draw inspiration from various
          sources, such as YouTube, Twitch, or other CS community sites. We
          recommend checking out content creators like nartouthere, NadeKing,
          NadesOutHere, wraethcsgo, austincsclips, Zulian0560, jsnasty, and
          FNScence on YouTube. Just remember to credit the creators when using
          their lineups.
        </p>
        <p>
          Another great way to learn cool nades is by watching professional
          players in action. You can watch their live streams or analyze their
          demos, which are often available on HLTV. If you&apos;re feeling
          adventurous, you can even experiment with your own lineup ideas in a
          local server and submit them if they turn out to be unique and
          effective.
        </p>
        <h2>Step 2: Record a video</h2>
        <p>
          Recording your nade throw is a crucial step in the process. We
          recommend using OBS (Open Broadcaster Software) for video recording,
          which you can{" "}
          <a href="https://obsproject.com" target="_blank" rel="noreferrer">
            download here
          </a>
          . To ensure OBS captures CS:GO correctly, add the launch option
          <em>-allow_third_party_software.</em>
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/1.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          You can find OBS guides online, but the OBS Auto-Configuration Wizard
          in the <em>Tools</em> section should work just fine for most setups.
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/2.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          Once you&apos;ve configured OBS, create a scene by right-clicking in
          the <em>Scenes</em> area. Click <em>add</em>, then enter the name of
          the scene.
        </p>
        <p>
          After adding the scene right click in “Sources” and add a “Game
          Capture”.
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/5.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          In CS:GO, select <em>Capture specific window</em> and choose{" "}
          <em>[csgo.exe]: Counter-Strike: Global Offensive - Direct3D 9.</em>
          <br />
          If you don&apos;t see it initially, restart OBS.
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/6.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          For a comprehensive video tutorial on recording CS:GO with OBS Studio
          in 2022, check out this video:
        </p>
        <p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/IuUqI8OyNas"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </p>
        <p>
          Here&apos;s a list of console commands to ensure you have the
          necessary tools for nade practice:
        </p>
        <BlogCodeSnippet
          code={
            "sv_cheats 1 sv_infinite_ammo 1\nammo_grenade_limit_total 5\nmp_warmup_end mp_freezetime 0\nmp_roundtime 60\nmp_roundtime_defuse 60\nsv_grenade_trajectory 1\nsv_grenade_trajectory_time 10\nsv_showimpacts 1\nmp_limitteams 0\nmp_autoteambalance 0\nmp_maxmoney 60000\nmp_startmoney 60000\nmp_buytime 9999\nmp_buy_anywhere 1\nmp_restartgame 1\nmp_startmoney 16000\nmp_respawn_on_death_ct 1\nmp_respawn_on_death_t 1\nbot_add_t\nbot_add_ct\nbot_kick bot_stop\n"
          }
        />
        <p>
          These commands ensure you have all the necessary resources for
          practicing your nades.
        </p>
        <p>
          Next, start a local server with bots by selecting{" "}
          <em>Practice with bots</em> and your preferred map. Paste the commands
          above or execute your custom file. Ensure your crosshair is clearly
          visible (we recommend using CSGO-aNKFP-FzteR-6uRz5-4WP64-X6urD) and
          that your aspect ratio is set to 16:9. Before recording, hide the HUD
          and net graph with the following commands:{" "}
          <em>cl_draw_only_deathnotices 1; net_graph 0.</em>
        </p>
        <p>
          To streamline the process, we&apos;ve created an exec file that
          changes your crosshair, resolution, and aspect ratio. Be sure to back
          up your old crosshair settings before making changes.
        </p>
        <BlogCodeSnippet
          code={
            'cl_crosshair_drawoutline 1\ncl_crosshair_outlinethickness 1.000000\ncl_crosshair_sniper_width 1\ncl_crosshairalpha 255\ncl_crosshaircolor 5\ncl_crosshaircolor_b 255\ncl_crosshaircolor_g 255\ncl_crosshaircolor_r "55\ncl_crosshairgap -1.000000\ncl_crosshairsize 4.500000\ncl_crosshairthickness 1.000000\ncl_crosshairusealpha 0\ncl_crosshairdot 0\ncl_crosshairstyle 4\nmat_setvideomode 1920 1080 0\ncl_draw_only_deathnotices 1\nnet_graph 0\nr_drawviewmodel 1\nbind "P" "toggle r_drawviewmodel 1 0"\nbind "K" "toggle cl_drawhud 1 0"'
          }
        />
        <p>
          You can customize the keys (<em>P</em> and <em>K</em>) for hiding your
          viewmodel and crosshair as needed.
        </p>
        <p>
          To switch between playing and recording, create a <em>competitive</em>{" "}
          exec that restores your original crosshair settings and resolution.
        </p>
        <h2>Step 3: Take screenshots</h2>
        <p>
          High-quality screenshots enhance the visibility of your lineup and
          make it more appealing. Avoid obstructing the view with your viewmodel
          or overlapping your crosshair with the ghost crosshair added by the
          site.
        </p>
        <p>
          You can take screenshots before or after recording your video. For the
          result image, throw the nade, wait for the trajectory line to
          disappear, and use either r_drawviewmodel 0; cl_drawhud 0 or the{" "}
          <em>P</em> and <em>K</em> binds from the exec to hide elements.
          Capture the screenshot using the <em>F12</em> key or your preferred
          screenshot software.
        </p>
        <p>
          For the lineup image, position yourself as if you were about to throw
          the nade, use the same hiding commands, and capture the screenshot. To
          ensure accuracy, don&apos;t move your mouse after taking the
          screenshot. If the lineup requires crouching, type <em>+duck</em> in
          the console (use
          <em>-duck</em> to uncrouch).
        </p>
        <h2>Step 4: Upload the video</h2>
        <p>
          To upload your video, remux it to .mp4 if it&apos;s in .mkv format. In
          OBS, go to the <em>File</em> tab and select <em>Remux Recordings.</em>
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/7.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          Choose your video and click <em>Remux.</em>
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/8.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          Next, go to YouTube, click <em>Upload</em>, and select your video in
          .mp4 format.
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/9.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          After uploading, naming and checking visibility to either
          &quot;unlisted&quot; or “public”, the video should start processing
          and be ready to watch after a short while. You should now be able to
          get the link by clicking on it and either copying the address in the
          search bar or through the sharing option.
        </p>
        <h2>Step 5: Add the lineup to the site</h2>
        <p>
          The final step of the whole process should only take about 5 minutes
          to complete. Take your time to properly assign all the necessary
          attributes. Make sure you are logged in, then follow these steps:
        </p>
        <p>
          <strong>
            1. Click on the dropdown list next to your avatar and select{" "}
            <em>Add Nade</em>.
          </strong>
        </p>
        <p>
          <img
            src="/blogimg/recording-nades/10.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          <strong>
            2. On this screen, add the previously copied YouTube link and click{" "}
            <em>Next</em>.
          </strong>
        </p>

        <p>
          <img
            src="/blogimg/recording-nades/11.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          <strong>
            3. Select the type of the nade, the map, start and end positions. If
            you have a link to a pro using this lineup, paste it in the{" "}
            <em>PRO LINK</em> section; this will give your nade a blue PRO
            checkmark.
          </strong>
        </p>
        <p>
          Next, choose for which team the lineup is more useful, CT&apos;s or
          T&apos;s, and specify the required movement. You have five options to
          choose from: stationary, crouching, crouch walking, walking, and
          running. The
          <em>Technique</em> field should indicate which buttons to press, such
          as mouse left, mouse right, mouse both, or jumpthrow variations (e.g.,
          standard jumpthrow, jumpthrow - mouse both, or a separate bind -
          jumpthrow+W).
        </p>
        <p>
          If you have setpos commands, you can paste them in the{" "}
          <em>SET POSITION COMMAND</em> section. If your smoke is a one-way
          smoke, tick the <em>Is One Way</em> box. Finally, in the description
          box, provide any tips you might have for anyone trying to perform the
          throw.
        </p>

        <p>
          <img
            src="/blogimg/recording-nades/12.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          <strong>
            4. On the map view screen, click on the spot where the nade will
            land on the map.
          </strong>
        </p>

        <p>
          <img
            src="/blogimg/recording-nades/13.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          <strong>
            5. Next, add a result and lineup image. If you used Steam
            screenshots, you can find them in:
            <br />
            <em>
              Program Files
              (x86)\Steam\userdata\(yoursteamID3)\760\remote\730\screenshots.
            </em>
          </strong>
        </p>

        <p>
          <img
            src="/blogimg/recording-nades/14.jpg"
            alt="Result showing big crosshair"
          />
        </p>
        <p>
          <strong>
            6. Finally, click <em>Submit Your Nade!</em>
          </strong>
        </p>
        <p>
          If you followed all the steps above, your nade should be submitted for
          review. It typically takes up to 24 hours to get your nade approved.
          During this time, you&apos;ll see the nade on your profile with a red
          frame, and its status will be <em>pending.</em> If your nade
          doesn&apos;t meet the standards, it will be declined, and you will
          receive feedback from one of the moderators on how to fix it. Good
          luck with your submissions!
        </p>
      </BlogPostArticle>
      <style jsx>{`
        .a-tag {
          margin: 30px 0px;
        }
        img {
          width: 100%;
          max-width: 600px;
        }
      `}</style>
    </>
  );
};
