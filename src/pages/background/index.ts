console.log("background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLinkedInCookie") {
    chrome.cookies.getAll({ url: "https://www.linkedin.com" }, (cookies) => {
      if (cookies && cookies.length > 0) {
        console.log("✅ LinkedIn Cookies Extracted:", cookies);
        sendResponse({ success: true, cookies: cookies });
        const myHeaders = new Headers();
        myHeaders.append(
          "Cookie",
          'li_sugr=10255953-4121-46ad-aa03-f9c0826b1a58; bcookie="v=2&7cde3c6e-7338-43ca-8515-04c676b94248"; bscookie="v=1&2024071812145768300e4f-2c6e-4f81-84ce-462acf53b2eaAQH0ryEEkkgrqSRlHV1e5yhvO3aQSDeH"; li_rm=AQH2vD6NUD0PZgAAAZD1WBy7gm9hXB4m7VyiENr77aH5ZZnDPkLiCJuNdyyuK2E_bHaWIPKn0T8-DtYyS_2vN7pH0EZnjMuGXkypLRcyAVppddwGQgOtPDZQ; aam_uuid=03721163350663036952246611381447483991; g_state={"i_l":0}; timezone=Asia/Calcutta; li_theme=light; li_theme_set=app; dfpfpt=6261e2bda9f64f9b8e64d9c3cc3c0e1d; JSESSIONID="ajax:2896263753989423880"; _guid=1c7b5804-6cad-48aa-b3d2-e414c82659c9; _gcl_au=1.1.813040028.1738556557; _uetvid=df695e70e4d711ef905557664c49d3ab; mbox=session#a9040b45d3534cbda588c08cf204b77f#1738881995|PC#a9040b45d3534cbda588c08cf204b77f.41_0#1754432130; gpv_pn=www.linkedin.com%2Fpremium%2Fproducts%2F; s_ips=832; AnalyticsSyncHistory=AQICeS_Vdlcu_QAAAZUmkx_r8JsyFC7bE2IrK3-JYcCKM2upXu1aD8D3IOuj8IY4DnznjGG-hRHtBMLP22k2fA; lms_ads=AQG-95hOuK9WTwAAAZUmkyIlQ7IyMCWfsELYEoiTj1yfdf4jPvpJtx5_3tYCEHBfbQMpd9507fdUfJ1iexQSAAAvtoFb0Ger; lms_analytics=AQG-95hOuK9WTwAAAZUmkyIlQ7IyMCWfsELYEoiTj1yfdf4jPvpJtx5_3tYCEHBfbQMpd9507fdUfJ1iexQSAAAvtoFb0Ger; s_tp=1409; s_tslv=1740113992618; fid=AQEVyj7GZuiMtgAAAZUsJcUnhw4P6_G6RukqE14A6orhoPGfVSkG8voWqqIkUcPOIFMbuVOe2qrAeg; liap=true; li_at=AQEDAVOUFXEBhQgqAAABlTF3k50AAAGVVYQXnU4AuuxG5WdJCKMoJLRwLBpHW2E1dhlMTjFK3SH5YV6SqFduEIRjddTebsa-Z8rJOpdRxhruHDb7a3mda86VSEZypppo-sJ708fMtlohOOfL5G_2muAi; fptctx2=taBcrIH61PuCVH7eNCyH0Iitb%252bEMfwlgK%252fM8w%252f28EbcjR4Fel4TrHXHi0tH2wethoU%252b4bxj6iXWbkpi4q7SOxcOHcnRvlY3abXFTglY4%252fnsiLwU%252bcuBsRctREahjfFWZ8Pa69DraXlAilg3enRqGhcRsD5NcB%252fn6bzIjaEbadN%252bSuUNitT32izdPX%252f2Hg1gn9HZJjMCnSKRm2C%252fauyEDt8qWICZ3f0UFrPGPM7QYXBOIwJ99FBWdWJbhWLswfUH6XCkuqah4PoZkKiUJ%252f6IuIQNRgYxlviKHAwLQe3x1zEoORN0tcr2C%252ff1kner6EVuyuMKvKrUGJDDNEP4iOAu6mcXmC7Aaj6zeomafX6wzuYo%253d; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C20142%7CMCMID%7C04247929219898242602297607775694623132%7CMCAAMLH-1740951927%7C12%7CMCAAMB-1740951927%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1740354327s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C13769540; lang="v=2&lang=en-us"; UserMatchHistory=AQLRLy3vrP1gQQAAAZU0xjxv26OnAlGRvr_JjOunlW3k50X9C54m2iEYoh1IkLGAef4e2QeJa_l4yj47IODykJtHiEbqj-o9e6FjoGDQS93oGW78dpYif2cznixeHyFoc6kFJWFlsgDSdAzM_UkfUb2RHA7WjdkqsuTjfyCDLgVaYNyXGVaHLS3_iGpb7i6zghkjIna0pXlEa62xR6ExD494B4Y-kYDd6kDevjOIMXz0TmZlZapHwoqMCcYuPX0fCMboQkSniBzWHW5eJ825qPvaxtZolgFHQI9qE36d8MMQyaEBzxtM73C2xv0WqskdqpnO5OiJIMn37Qg1h5QfEzVguQIOB5pkQj4Fe9INE3KZRXa6Lw; lidc="b=TB45:s=T:r=T:a=T:p=T:g=6456:u=35:x=1:i=1740347163:t=1740371212:v=2:sig=AQFw7I8b13rNiYBigIGdmVRfm9RM-H8T\'; bcookie="v=2&7cde3c6e-7338-43ca-8515-04c676b94248"; lang="v=2&lang=en-us"; lidc="b=TB45:s=T:r=T:a=T:p=T:g=6457:u=35:x=1:i=1740392805:t=1740461203:v=2:sig=AQGjwwCOfTFF3ejAnExMjKwSU7d4bSs3"; bscookie="v=1&2024071812145768300e4f-2c6e-4f81-84ce-462acf53b2eaAQH0ryEEkkgrqSRlHV1e5yhvO3aQSDeH"'
        );
        myHeaders.append("csrf-token", "ajax:2896263753989423880");
        myHeaders.append(
          "User-Agent",
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
        );
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          requestId:
            "com.linkedin.sdui.mynetwork.requests.connectionsListTypeaheadRequestAction",
          serverRequest: {
            $type: "proto.sdui.actions.core.ServerRequest",
            requestId:
              "com.linkedin.sdui.mynetwork.requests.connectionsListTypeaheadRequestAction",
            payload: {
              resultsComponentRef: "connectionsListTypeahead_TypeaheadResults",
              origin: "MY_NETWORK_CONNECTIONS_LIST_TYPEAHEAD",
              keywordsField: {
                key: "connectionsListKeywordsField",
                namespace: "connectionsListTypeahead",
              },
              keywordsBinding: "connectionsListKeywordsField",
              selectionBinding: "connectionsListTypeaheadSelection",
            },
            requestedStates: [
              {
                $type: "proto.sdui.StateKey",
                value: "connectionsListKeywordsField",
                key: {
                  $type: "proto.sdui.Key",
                  value: {
                    $case: "id",
                    id: "connectionsListKeywordsField",
                  },
                },
                namespace: "connectionsListTypeahead",
              },
            ],
            requestedArguments: {
              $type: "proto.sdui.actions.requests.RequestedArguments",
              payload: {
                resultsComponentRef:
                  "connectionsListTypeahead_TypeaheadResults",
                origin: "MY_NETWORK_CONNECTIONS_LIST_TYPEAHEAD",
                keywordsField: {
                  key: "connectionsListKeywordsField",
                  namespace: "connectionsListTypeahead",
                },
                keywordsBinding: "connectionsListKeywordsField",
                selectionBinding: "connectionsListTypeaheadSelection",
              },
              requestedStateKeys: [
                {
                  $type: "proto.sdui.StateKey",
                  value: "connectionsListKeywordsField",
                  key: {
                    $type: "proto.sdui.Key",
                    value: {
                      $case: "id",
                      id: "connectionsListKeywordsField",
                    },
                  },
                  namespace: "connectionsListTypeahead",
                },
              ],
            },
            isStreaming: false,
            rumPageKey: "",
          },
          states: [
            {
              key: "connectionsListKeywordsField",
              namespace: "connectionsListTypeahead",
              value: "h",
            },
          ],
          requestedArguments: {
            $type: "proto.sdui.actions.requests.RequestedArguments",
            payload: {
              resultsComponentRef: "connectionsListTypeahead_TypeaheadResults",
              origin: "MY_NETWORK_CONNECTIONS_LIST_TYPEAHEAD",
              keywordsField: {
                key: "connectionsListKeywordsField",
                namespace: "connectionsListTypeahead",
              },
              keywordsBinding: "connectionsListKeywordsField",
              selectionBinding: "connectionsListTypeaheadSelection",
            },
            requestedStateKeys: [
              {
                $type: "proto.sdui.StateKey",
                value: "connectionsListKeywordsField",
                key: {
                  $type: "proto.sdui.Key",
                  value: {
                    $case: "id",
                    id: "connectionsListKeywordsField",
                  },
                },
                namespace: "connectionsListTypeahead",
              },
            ],
            states: [
              {
                key: "connectionsListKeywordsField",
                namespace: "connectionsListTypeahead",
                value: "h",
              },
            ],
          },
        });

        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          // body: raw,
          redirect: "follow",
        };

        fetch(
          "https://www.linkedin.com/flagship-web/mynetwork/invite-connect/connections",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      } else {
        console.log("❌ No LinkedIn cookies found.");
        sendResponse({ success: false });
      }
    });

    return true;
  }
});
