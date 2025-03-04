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
          cookies.map((cookie) => cookie.name + "=" + cookie.value).join("; ")
        );

        myHeaders.append(
          "csrf-token",
          cookies
            .filter((r) => r.name === "JSESSIONID")[0]
            .value.replace(`"`, "")
        );
        myHeaders.append("Content-Type", "application/json");

        // this is for searching for connections
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

        // this is for getting connections
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
