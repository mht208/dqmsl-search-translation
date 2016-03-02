// ==UserScript==
// @name        DQMSL Search Translation
// @namespace   https://github.com/mht208/dqmsl-search-translation
// @include     http://dqmsl-search.net/*
// @include     http://dqmsl.jpn.org/*
// @version     2016.3.2.0
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// ==/UserScript==

var exceptions=["DQMSLサーチ","ドラゴンクエストモンスターズ　スーパーライト　モンスターデータ検索サイト"],others={"モンスター簡易キーワード検索":"關鍵字檢索","ホーム":"首頁","モンスターデータ詳細検索":"怪物資料詳細檢索","モンスターデータ比較":"怪物資料比較","対策モンスター検索":"對策怪物檢索","クエスト情報":"討伐情報","おすすめパーティ編成":"推薦隊伍編成","パーティステータスチェッカー":"隊伍狀態檢視","[ｸｴｽﾄ]パーティ戦力チェッカー":"[討伐] 隊伍戰力檢視","[闘技]パーティ戦力チェッカー":"[鬥技] 隊伍戰力檢視","DQMSLダメージシミュレータ":"傷害計算機","DQMSLアイコンジェネレータ":"圖示產生器","呪文ダメージ計算機":"咒文傷害計算機","闘技場ツイートフォース":"鬥技募集Tweet","闘技場マッチング":"鬥技對戰募集","ともだち招待コード自動配信":"好友邀請碼自動配送","ステータスランキングTOP10":"怪物能力TOP10","ステータスランキング一覧":"怪物能力排名表",
"耐性ランキング":"耐性排名","転生用タマゴロン一覧":"轉生蛋一覧","モンスター図鑑マトリクス":"怪物圖鑑（矩陣）","ランク別モンスター図鑑":"怪物圖鑑（級別）","系統別モンスター図鑑":"怪物圖鑑（系統別）","タイプ別モンスター図鑑":"怪物圖鑑（類型別）","とくぎ別モンスター図鑑":"怪物圖鑑（特技別）","耐性別モンスター図鑑":"怪物圖鑑（耐性別）","リーダー特性別モンスター図鑑":"怪物圖鑑（隊長特性別）","特性別モンスター図鑑":"怪物圖鑑（特性別）","ウェイト別モンスター図鑑":"怪物圖鑑（重量別）","装備品／錬金素材図鑑":"裝備／煉金素材圖鑑","とくぎレベルアップ調査":"特技等級能力調查","その他ネタなど":"其他資料","新着コメント":"最新評論","最近見たモンスター":"最近瀏覽怪物","ピックアップ":"Pickup","お問い合わせ":"聯絡我們","DQMSL運営からのお知らせ":"DQMSL營運情報","ステータス":"狀態","パワーアップシミュレータ":"合星能力計算","とくぎ":"特技","リーダー特性":"隊長特性",
"経験値":"經驗值","転生":"轉生","ランク":"級別","タイプ":"類型","ｳｪｲﾄ":"重量","レベル":"等級","モンスター":"怪物","素早さ":"敏捷","賢さ":"智力","スライム系":"史萊姆系","ドラゴン系":"龍系","魔獣系":"魔獸系","自然系":"自然系","物質系":"物質系","悪魔系":"惡魔系","ゾンビ系":"殭屍系","？？？系":"？？？系","転生系":"轉生系","マヒ":"痲痹","ﾏﾎﾄｰﾝ":"瑪霍托恩","ﾏﾇｰｻ":"瑪努撒","眠り":"睡眠","混乱":"混亂","息封じ":"氣息封印","こんらん":"混亂","なし":"無"},monsters={1:{jn:"スライム",cn:"史萊姆"},2:{jn:"スライムベス",cn:"史萊姆貝斯"},3:{jn:"バブルスライム",cn:"泡沫史萊姆"},4:{jn:"霍伊米スライム",cn:"霍伊米史萊姆"},5:{jn:"スライムファング",cn:"赤毛史萊姆"},6:{jn:"スライムつむり",cn:"蝸牛史萊姆"},7:{jn:"スライムカルゴ",cn:"貝殼史萊姆"},
8:{jn:"スライムナイト",cn:"史萊姆騎士"},9:{jn:"エンゼルスライム",cn:"天使史萊姆"},10:{jn:"メタルスライム",cn:"金屬史萊姆"},11:{jn:"メタルライダー",cn:"金屬騎士"},12:{jn:"キングスライム",cn:"史萊姆王"},13:{jn:"ベホマスライム",cn:"貝霍瑪史萊姆"},14:{jn:"はぐれメタル",cn:"流浪金屬史萊姆"},15:{jn:"ダークナイト",cn:"暗黑騎士"},16:{jn:"スライムベホマズン",cn:"史萊姆貝霍瑪曾"},17:{jn:"メタルキング",cn:"金屬史萊姆王"},18:{jn:"ボックススライム",cn:"方塊史萊姆"},19:{jn:"マリンスライム",cn:"海生史萊姆"},20:{jn:"チョコスライム",cn:"巧克力史萊姆"},21:{jn:"バブルキング",cn:"泡沫史萊姆王"},22:{jn:"マシュマロスライム",cn:"棉花糖史萊姆"},23:{jn:"リボンホイミン",cn:"緞帶霍伊米恩"},24:{jn:"スライムタワー",cn:"史萊姆塔"},25:{jn:"プレミアムスライム",
cn:"高級史萊姆"},26:{jn:"Vスライム",cn:""},27:{jn:"ダークスライム",cn:"黑暗史萊姆"},28:{jn:"ダークキング",cn:"黑暗史萊姆王"},29:{jn:"勇車スラリンガル",cn:"勇車史拉琳加爾"},30:{jn:"スラン",cn:"史蘭"},31:{jn:"スライムエンペラー",cn:"史萊姆帝王"},32:{jn:"スライムマデュラ",cn:"赤光史萊姆"},33:{jn:"スラキャンサー",cn:"史萊姆蟹"},34:{jn:"スライムジェネラル",cn:"史萊姆上將"},35:{jn:"ゴッドライダー",cn:"神騎士"},36:{jn:"Vスライムナイト",cn:""},37:{jn:"おまつりホイミン",cn:""},38:{jn:"ライムスライム",cn:""},39:{jn:"メタルブラザーズ",cn:"金屬三兄弟"},40:{jn:"ゴールデントーテム",cn:"黃金圖騰"},41:{jn:"グランスライム",cn:"偉大史萊姆"},42:{jn:"メタルカイザー",cn:"金屬大帝史萊姆"},43:{jn:"ぶちスライム",
cn:"斑點史萊姆"},44:{jn:"ぶちスライムベス",cn:"斑點史萊姆貝斯"},45:{jn:"ぶちベホマラー",cn:"斑點貝霍瑪拉"},46:{jn:"スライダークボディ",cn:"黑暗史萊軀體"},47:{jn:"スライダークレフト",cn:"黑暗史萊左部件"},48:{jn:"スライダークライト",cn:"黑暗史萊右部件"},49:{jn:"スライダークロボ",cn:"黑暗史萊機器人"},50:{jn:"メタルスラン",cn:""},51:{jn:"とさかへび",cn:"雞冠蛇"},52:{jn:"いっかく竜",cn:"獨角龍"},53:{jn:"ダッシュラン",cn:"衝鋒龍"},54:{jn:"ドラゴン",cn:"龍"},55:{jn:"ギャオース",cn:"惡吼海龍"},56:{jn:"たつのこナイト",cn:"海馬騎士"},57:{jn:"プテラノドン",cn:"無齒翼龍"},58:{jn:"ガメゴン",cn:"龜龍"},59:{jn:"バトルレックス",cn:"戰鬥恐龍"},60:{jn:"アイアンタートル",cn:"鋼鐵甲龜"},61:{jn:"海竜",cn:"海龍"},
62:{jn:"ソードドラゴン",cn:"劍龍"},63:{jn:"シュプリンガー",cn:"高跳騎士"},64:{jn:"アルゴングレート",cn:"大阿爾貢"},65:{jn:"ヘルダイバー",cn:"地獄深潛者"},66:{jn:"デンタザウルス",cn:"長釘甲龍"},67:{jn:"アンドレアル",cn:"安德雷阿爾"},68:{jn:"オーシャンクロー",cn:"海洋鉤爪"},69:{jn:"アイスコンドル",cn:"冰翼龍"},70:{jn:"やまたのおろち",cn:"八俣遠呂智"},71:{jn:"ヒドラ",cn:"海德拉"},73:{jn:"オリハルゴン",cn:"地龍奧利哈爾龍"},74:{jn:"リバイアさま",cn:"利拜亞大人"},75:{jn:"フライングデス",cn:"飛翔的死神"},76:{jn:"アイスビックル",cn:"冰雪鉤爪"},77:{jn:"リザードキッズ",cn:"蜥蜴幼仔"},78:{jn:"グレイトドラゴン",cn:"偉大金龍"},79:{jn:"ブラックドラゴン",cn:"黑龍"},80:{jn:"スカルゴン",cn:"骨龍"},81:{jn:"ドラゴンゾンビ",
cn:"屍龍"},82:{jn:"ピットバイパー",cn:"劇毒大蛇"},83:{jn:"フルスネイカー",cn:""},84:{jn:"テラノライナー",cn:""},85:{jn:"ガメゴンロード",cn:"龜龍領主"},86:{jn:"サウルスロード",cn:"甲龍王"},87:{jn:"バザックス",cn:""},88:{jn:"コドラ",cn:"幼龍"},89:{jn:"テラノザース",cn:"小暴龍"},90:{jn:"はしりとかげ",cn:"奔跑蜥蜴"},91:{jn:"ドラン",cn:"多蘭"},92:{jn:"グリーンドラゴン",cn:"綠龍"},93:{jn:"レッドドラゴン",cn:"紅龍"},94:{jn:"ガメゴンレジェンド",cn:"傳奇龜龍"},95:{jn:"クローハンズ",cn:"鉤爪手"},96:{jn:"Vロン",cn:""},97:{jn:"りゅうせんし",cn:"龍戰士"},98:{jn:"まかいファイター",cn:"魔界戰士"},99:{jn:"ヘルジュラシック",cn:""},101:{jn:"キャタピラー",cn:"毛蟲怪"},102:{jn:"ぐんたいアリ",
cn:"軍隊蟻"},103:{jn:"ミノーン",cn:"蓑怪"},104:{jn:"おおにわとり",cn:"巨型公雞"},105:{jn:"あばれうしどり",cn:"兇暴牛鳥"},106:{jn:"ホークブリザード",cn:"暴雪鷹"},107:{jn:"テールイーター",cn:"長尾蟲"},108:{jn:"かまいたち",cn:"鎌鼬"},109:{jn:"じんめんちょう",cn:"人面蝶"},110:{jn:"はさみくわがた",cn:"剪刀甲蟲"},111:{jn:"せみもぐら",cn:"蟬鼴鼠"},112:{jn:"ビーンファイター",cn:"豌豆戰士"},113:{jn:"ヘルコンドル",cn:"地獄兀鷲"},114:{jn:"ガルーダ",cn:"迦樓羅"},115:{jn:"かりゅうそう",cn:"火龍草"},116:{jn:"オニオーン",cn:"洋蔥鬼"},117:{jn:"ひくいどり",cn:"食火鳥"},118:{jn:"かぶとこぞう",cn:"兜蟲小鬼"},119:{jn:"ひとくいそう",cn:"食人草"},120:{jn:"ローズダンス",cn:"玫瑰舞女"},
121:{jn:"ローズバトラー",cn:"玫瑰鬥士"},122:{jn:"ヘラクレイザー",cn:"長戟角蟲"},123:{jn:"さそりアーマー",cn:"鎧甲蠍"},124:{jn:"キメラ",cn:"奇美拉"},125:{jn:"メイジキメラ",cn:"法師奇美拉"},126:{jn:"サンダーバード",cn:"雷鳥"},127:{jn:"スターキメラ",cn:"明星奇美拉"},128:{jn:"大王イカ",cn:"大王烏賊"},129:{jn:"テンタクルス",cn:"觸手怪"},130:{jn:"クラーゴン",cn:"庫拉貢"},131:{jn:"アーマービートル",cn:"鎧甲蟲"},132:{jn:"どくイモムシ",cn:""},133:{jn:"かえんムカデ",cn:""},134:{jn:"アイアンアント",cn:"鐵蟻"},135:{jn:"ラリホーアント",cn:"拉裡霍蟻"},136:{jn:"たまねぎマン",cn:"洋蔥人"},137:{jn:"じごくのたまねぎ",cn:"地獄洋蔥"},138:{jn:"うずしおキング",cn:"渦流之王"},139:{jn:"レッドサイクロン",
cn:"紅色颶風"},140:{jn:"ラリホービートル",cn:"拉裡霍甲蟲"},141:{jn:"ヘルビートル",cn:"地獄甲蟲"},142:{jn:"デビルプラント",cn:"惡魔草"},143:{jn:"マンドレイク",cn:"曼德拉草"},144:{jn:"あくまのす",cn:"惡魔巢穴"},145:{jn:"トンネラー",cn:"掘穴怪"},146:{jn:"ごくらくちょう",cn:"極樂鳥"},147:{jn:"キャタピン",cn:"毛毛蟲"},148:{jn:"クインローズ",cn:"薔薇女王"},149:{jn:"メタルナスビ",cn:"金屬茄子怪"},150:{jn:"メタルスコーピオン",cn:"金屬蠍"},151:{jn:"ももんじゃ",cn:"絨絨鴨"},152:{jn:"いたずらもぐら",cn:"淘氣鼴鼠"},153:{jn:"おおきづち",cn:"大木鎚"},154:{jn:"イエティ",cn:"雪人"},155:{jn:"キラースコップ",cn:"瘋狂鐵鍬"},156:{jn:"ベビーパンサー",cn:"幼崽豹"},157:{jn:"ビックアイ",cn:"大眼怪"},
158:{jn:"ブラウニー",cn:"大鐵鎚"},159:{jn:"ダークホーン",cn:"暗黑角怪"},160:{jn:"トドマン",cn:"海獅男"},161:{jn:"キラーパンサー",cn:"殺人豹"},162:{jn:"タイガーランス",cn:"虎馬槍兵"},163:{jn:"ライノソルジャー",cn:"犀牛戰士"},164:{jn:"アイアンブルドー",cn:"鋼鐵水牛"},165:{jn:"イノブタマン",cn:"野豬怪"},166:{jn:"ダンビラムーチョ",cn:"段平刀姆喬"},167:{jn:"やつざきアニマル",cn:"撕裂獸"},168:{jn:"キラーピッケル",cn:"冰鎬殺手"},169:{jn:"コングヘッド",cn:"猩猩頭"},170:{jn:"グレイトホーン",cn:"持角獸人"},171:{jn:"グレンデル",cn:"戈蘭德爾"},172:{jn:"モヒカント",cn:"銀獠牙"},173:{jn:"キマイラロード",cn:"客邁拉"},174:{jn:"とうだいタイガー",cn:"燈塔猛虎"},175:{jn:"グリズリー",cn:"灰熊怪"},
176:{jn:"オーク",cn:"半獸人"},177:{jn:"とらおとこ",cn:"虎皮男"},178:{jn:"キラーエイプ",cn:"殺人猩猩"},179:{jn:"ゴートドン",cn:"暴怒山羊"},180:{jn:"バッファロン",cn:"金牛怪"},181:{jn:"バルザック",cn:"巴爾札克"},182:{jn:"チョコももんじゃ",cn:"巧克力絨絨鴨"},183:{jn:"ベンガル",cn:"孟加拉虎人"},184:{jn:"アルミラージ",cn:"衝鋒兔"},185:{jn:"キングムーチョ",cn:"姆喬之王"},186:{jn:"シーライオン",cn:"海獅"},187:{jn:"グレートオーラス",cn:"大海象"},188:{jn:"ゴールドオーク",cn:"黃金半獸人"},189:{jn:"オークキング",cn:"半獸人大王"},190:{jn:"ケムケムベス",cn:"絨毛貝斯"},191:{jn:"デザートきづち",cn:"甜點大錘"},192:{jn:"オークデビル",cn:"惡魔半獸人"},193:{jn:"ボアソルジャー",cn:"野豬戰士"},
194:{jn:"サイおとこ",cn:"犀男"},195:{jn:"ライノスキング",cn:"犀牛大王"},196:{jn:"ダックスビル",cn:"鴨嘴怪"},197:{jn:"メイジももんじゃ",cn:"法師絨絨鴨"},198:{jn:"デザートゴースト",cn:"沙漠幽靈"},199:{jn:"ビッグスロース",cn:"大樹獺"},200:{jn:"ベロリンマン",cn:"長舌男"},201:{jn:"バルザックビースト",cn:"巴爾札克獸"},202:{jn:"アームライオン",cn:"多臂獅"},203:{jn:"キングレオ",cn:"獅王"},204:{jn:"マンモデウス",cn:"マンモデウス"},205:{jn:"ギガデーモン",cn:"大惡魔"},206:{jn:"いっかくウサギ",cn:"いっかくウサギ"},207:{jn:"ちんもくのひつじ",cn:"沈默角羊"},208:{jn:"ラリホーン",cn:"拉裡霍恩"},209:{jn:"ドン・モグーラ",cn:"鼴鼠頭領"},210:{jn:"ホワイトランサー",cn:"白色槍騎兵"},211:{jn:"キマライガー",
cn:"キマライガー"},212:{jn:"しましまキャット",cn:"條紋貓"},213:{jn:"プリズニャン",cn:"條紋喵"},214:{jn:"ベロニャーゴ",cn:"條紋咪"},215:{jn:"ねこまどう",cn:"貓魔導士"},216:{jn:"ジャガーメイジ",cn:"豹貓法師"},217:{jn:"ベンガルクーン",cn:"虎貓術士"},218:{jn:"ブルファング",cn:"藍獠牙"},219:{jn:"じごくのヌエ",cn:"じごくのヌエ"},220:{jn:"ハヌマーン",cn:"哈奴曼"},221:{jn:"レッドオーガ",cn:"紅巨魔"},222:{jn:"マッスルウータン",cn:"肌肉猿"},223:{jn:"黒竜丸",cn:"黑龍丸"},224:{jn:"キャットフライ",cn:"飛貓"},225:{jn:"キャットバット",cn:"蝙蝠貓"},226:{jn:"ナイトキャット",cn:"夜貓"},227:{jn:"キャット・リベリオ",cn:"凱特裡貝裡奧"},228:{jn:"リベリオファミリー",cn:"裡貝裡奧家族"},229:{jn:"Vプリズニャン",
cn:"Vプリズニャン"},230:{jn:"ソルジャーブル",cn:"藍鼻魔兵"},231:{jn:"ゴンズ",cn:"貢茲"},232:{jn:"ウニャ",cn:"烏喵"},234:{jn:"ミャルジ",cn:"喵爾吉"},235:{jn:"ミュベス",cn:"喵貝斯"},236:{jn:"ニャンデミト",cn:"喵德米特"},237:{jn:"プオーン",cn:"普翁"},238:{jn:"ブオーン",cn:"布翁"},240:{jn:"ユニコーン",cn:"獨角獸"},241:{jn:"レジェンドホーン",cn:"傳奇聖角"},242:{jn:"ケンタラウス",cn:"ケンタラウス"},243:{jn:"ラムポーン",cn:"ラムポーン"},244:{jn:"ジャミ",cn:"賈米"},245:{jn:"ななしの子ネコ",cn:"無名小貓"},246:{jn:"ゲレゲレ",cn:"吼吼"},247:{jn:"レノファイター",cn:"馴鹿鬥士"},248:{jn:"マッドファルコン",cn:"瘋狂獵鷹"},249:{jn:"にじくじゃく",cn:"彩虹孔雀"},250:{jn:"れんごくまちょう",
cn:"煉獄魔鳥"},251:{jn:"おばけキャンドル",cn:"蠟燭怪"},252:{jn:"わらいぶくろ",cn:"笑面口袋"},253:{jn:"ブリザード",cn:"暴風雪"},254:{jn:"フレイム",cn:"烈焰怪"},255:{jn:"おどるほうせき",cn:"舞蹈寶石"},256:{jn:"ひとくい箱",cn:"食人箱"},257:{jn:"ゴールドマン",cn:"黃金人"},258:{jn:"ギズモ",cn:"雲霧怪"},259:{jn:"あくまの書",cn:"惡魔之書"},260:{jn:"くもの大王",cn:"雲大王"},261:{jn:"メタルハンター",cn:"金屬獵人"},262:{jn:"ゴーレム",cn:"巨像兵"},263:{jn:"ひとくいサーベル",cn:"食人軍刀"},264:{jn:"ミミック",cn:"寶箱怪"},265:{jn:"だいあくまの書",cn:"大惡魔之書"},266:{jn:"魔王の書",cn:"魔王之書"},267:{jn:"キラーマシン",cn:"殺戮機器"},268:{jn:"あくまのつぼ",cn:"惡魔罐"},269:{jn:"キラーマシン2",
cn:"殺戮機器2"},270:{jn:"キラーマジンガ",cn:"殺戮魔神"},271:{jn:"チョコゴーレム",cn:"巧克力巨像兵"},272:{jn:"チョコマドハンド",cn:"巧克力泥手"},273:{jn:"エビルチャリオット",cn:"惡魔戰車"},274:{jn:"うごくせきぞう",cn:"會動的石像"},275:{jn:"ともしびこぞう",cn:"燭火小鬼"},276:{jn:"マカロンゴーレム",cn:"馬卡龍巨像兵"},277:{jn:"キラーマシンライト",cn:"殺戮機器Light"},278:{jn:"しびれだんびら",cn:"痲痹段平刀"},279:{jn:"ブラッドソード",cn:"血腥之劍"},280:{jn:"Sキラーマシン",cn:"S殺戮機器"},281:{jn:"ストーンマン",cn:"石頭人"},282:{jn:"アイスゴーレム",cn:"寒冰巨像"},283:{jn:"マジーン",cn:"怒魔"},284:{jn:"ヒートギズモ",cn:"熱雲怪"},285:{jn:"フロストギズモ",cn:"霜雲怪"},286:{jn:"ウルベア魔神兵",
cn:"烏爾貝阿魔神兵"},287:{jn:"ヘルクラウダー",cn:"地獄掌雲者"},288:{jn:"ヘルミラージュ",cn:"地獄蜃景"},289:{jn:"パンドラボックス",cn:"潘多拉盒"},290:{jn:"Vゴーレム",cn:"Vゴーレム"},291:{jn:"バル",cn:"巴爾"},292:{jn:"ベル",cn:"貝爾"},293:{jn:"ブル",cn:"波爾"},294:{jn:"ボル",cn:"布爾"},295:{jn:"バベルボブル",cn:"巴貝爾波布爾"},296:{jn:"木馬の騎士",cn:"木馬騎士"},297:{jn:"さまようよろい",cn:"徬徨甲冑"},298:{jn:"じごくのよろい",cn:"地獄甲冑"},299:{jn:"キラーアーマー",cn:"殺人鎧甲"},300:{jn:"たんすミミック",cn:"たんすミミック"},301:{jn:"ドラキー",cn:"多拉奇"},302:{jn:"ドラキーマ",cn:"多拉奇瑪"},303:{jn:"おおめだま",cn:"大眼球"},304:{jn:"ベビーサタン",cn:"魔王寶寶"},
305:{jn:"グレムリン",cn:"格裡姆林"},306:{jn:"ヌボーン",cn:"努伯恩"},307:{jn:"デザートデーモン",cn:"甜點惡魔"},308:{jn:"サタンパピー",cn:"輕浮魔王"},309:{jn:"オーガヘッド",cn:"巨魔頭"},310:{jn:"じごくのもんばん",cn:"地獄看門人"},311:{jn:"アークデーモン",cn:"上級惡魔"},312:{jn:"オーガー",cn:"綠巨魔"},313:{jn:"トロルボンバー",cn:"暴風食人魔"},314:{jn:"ベリアル",cn:"貝利亞"},315:{jn:"デーモンレスラー",cn:"惡魔摔跤手"},316:{jn:"スペクテット",cn:"衝鋒大眼球"},317:{jn:"トロル",cn:" 食人魔"},318:{jn:"ボストロール",cn:" 食人魔頭目"},319:{jn:"ひとつめピエロ",cn:"ひとつめピエロ"},320:{jn:"あくまの騎士",cn:"惡魔騎士"},321:{jn:"死神の騎士",cn:"死神騎士"},322:{jn:"タホドラキー",cn:"塔霍多拉奇"},
323:{jn:"シルバーデビル",cn:"白銀惡魔"},324:{jn:"バズズ",cn:"帕祖祖"},327:{jn:"ギガンテス",cn:"癸幹忒斯"},328:{jn:"アトラス",cn:"阿特拉斯"},329:{jn:"ヘルバトラー",cn:"地獄鬥士"},330:{jn:"アンクルホーン",cn:"巨角獸人"},331:{jn:"チョコドラキー",cn:"巧克力多拉奇"},332:{jn:"デビルプリンス",cn:"惡魔王子"},334:{jn:"てっきゅうまじん",cn:"鐵球魔人"},335:{jn:"つかいま",cn:"使魔"},336:{jn:"ミニデーモン",cn:"迷你惡魔"},337:{jn:"オーガソルジャー",cn:"巨魔戰士"},338:{jn:"ビッグボック",cn:"比格伯克"},339:{jn:"アロダイタス",cn:"阿羅代塔斯"},340:{jn:"ベレス",cn:"比利士"},341:{jn:"デスカイザー",cn:"死亡凱撒"},343:{jn:"じごくのピエロ",cn:"地獄小丑"},344:{jn:"デス・アミーゴ",cn:"死亡亞密戈"},
345:{jn:"じごくのつかい",cn:"地獄爪牙"},346:{jn:"あくましんかん",cn:"惡魔神官"},347:{jn:"サイクロプス",cn:"貝比爾"},348:{jn:"サイクロプス",cn:"獨眼巨人"},349:{jn:"デビルロード",cn:"惡魔領主"},350:{jn:"くびかり族",cn:"獵首族"},351:{jn:"がいこつ",cn:"骸骨"},352:{jn:"スカルブレード",cn:"骷髏大劍"},353:{jn:"ナイトウイプス",cn:"暗夜幽火"},354:{jn:"しにがみ",cn:"死神"},355:{jn:"ソードファントム",cn:"幽靈劍客"},356:{jn:"しりょうのきし",cn:"死靈騎士"},357:{jn:"エビルスピリッツ",cn:"邪惡精神體"},358:{jn:"黒騎士レオコーン",cn:"黑騎士雷歐科恩"},359:{jn:"がいこつけんし",cn:"骸骨劍士"},360:{jn:"なげきのぼうれい",cn:"嘆息的亡靈"},361:{jn:"デュラハーン",cn:"杜拉罕"},362:{jn:"ワイトキング",cn:"鬼王"},
363:{jn:"フレアドラゴン",cn:"炎光龍"},364:{jn:"かげのきし",cn:"陰影騎士"},365:{jn:"デススパーク",cn:"死亡幽閃"},367:{jn:"死神きぞく",cn:"死神貴族"},368:{jn:"スケアフレイル",cn:"暗黑流星錘"},369:{jn:"ヘルガーディアン",cn:"地獄守護者"},370:{jn:"グレートライドン",cn:"偉大騎手"},371:{jn:"ボーンナイト",cn:"白骨騎士"},372:{jn:"ぼうれい剣士",cn:"亡靈劍士"},373:{jn:"シルバーマント",cn:"銀斗篷"},374:{jn:"デスプリースト",cn:"死亡牧師"},375:{jn:"ブラッドナイト",cn:"血色騎士"},376:{jn:"じごくのきし",cn:"地獄騎士"},377:{jn:"くさった死体",cn:"腐爛屍體"},378:{jn:"どくどくゾンビ",cn:"劇毒殭屍"},379:{jn:"グール",cn:"食屍鬼"},380:{jn:"王子グールー",cn:"王子食屍鬼"},381:{jn:"メタルゴースト",cn:"金屬鬼魂"},
382:{jn:"ナイトリッチ",cn:"騎士死屍"},383:{jn:"ナイトキング",cn:"ナイトキング"},384:{jn:"ヴァルハラー",cn:"瓦爾哈拉"},385:{jn:"キャプテン・クロウ",cn:"克洛船長"},389:{jn:"ハロウィンゴースト",cn:"萬聖節鬼魂"},390:{jn:"ミイラ男",cn:"木乃伊"},391:{jn:"マミー",cn:"乾屍"},392:{jn:"ブラッドマミー",cn:"血腥乾屍"},393:{jn:"ハロウィンマミー",cn:"萬聖節乾屍"},394:{jn:"ネクロマンサー",cn:"ネクロマンサー"},395:{jn:"ゲマ",cn:"蓋瑪"},396:{jn:"ソードイド",cn:"骸骨守衛"},397:{jn:"ボーンファイター",cn:"白骨鬥士"},398:{jn:"魔王の使い",cn:"魔王的從者"},399:{jn:"ヘルクラッシャー",cn:"ヘルクラッシャー"},401:{jn:"タマゴロン",cn:"奇異蛋"},402:{jn:"ツリーエッグ",cn:"樹蛋"},403:{jn:"メカタマゴロン",cn:"機械奇異蛋"},
404:{jn:"ゴーストエッグ",cn:"幽靈蛋"},405:{jn:"リザードエッグ",cn:"蜥蜴蛋"},406:{jn:"キバゴロン",cn:"尖牙蛋"},407:{jn:"どくゴロン",cn:"毒性蛋"},408:{jn:"ワンダーエッグ",cn:"神秘蛋"},409:{jn:"リーフエッグ",cn:"綠葉蛋"},410:{jn:"タマゴーレム",cn:"巨像蛋"},411:{jn:"デビルエッグ",cn:"惡魔蛋"},412:{jn:"ドラゴンエッグ",cn:"龍蛋"},413:{jn:"くまゴロン",cn:"魔熊蛋"},414:{jn:"ホネゴロン",cn:"亡骨蛋"},415:{jn:"キングタマゴロン",cn:"奇異蛋之王"},416:{jn:"ニジゴロン",cn:"彩虹蛋"},418:{jn:"マスターエッグ",cn:"大師蛋"},420:{jn:"超マスターエッグ",cn:"超級大師蛋"},421:{jn:"まおうのたまご",cn:"魔王之蛋"},422:{jn:"エンペラン",cn:"帝王之蛋"},423:{jn:"ジェネラン",cn:"將軍之蛋"},424:{jn:"パンサーエッグ",
cn:"獵豹蛋"},425:{jn:"プオーンエッグ",cn:"普翁蛋"},426:{jn:"超とくぎバイブル",cn:""},427:{jn:"とくぎバイブル",cn:""},428:{jn:"とくぎの秘伝書",cn:""},429:{jn:"メラの呪文書",cn:"美拉咒文書"},430:{jn:"不死鳥のたまご",cn:"不死鳥之蛋"},431:{jn:"ムドーエッグ",cn:"姆多蛋"},432:{jn:"ふしぎなたまご",cn:"神奇蛋"},433:{jn:"ヒャドの呪文書",cn:""},434:{jn:"しんせいの蒼玉",cn:""},435:{jn:"しんせいの竜玉",cn:"新生龍珠"},436:{jn:"しんせいの翠玉",cn:"新生翠珠"},437:{jn:"しんせいの獣玉",cn:""},438:{jn:"しんせいの鋼玉",cn:""},439:{jn:"しんせいの闇玉",cn:"新生暗珠"},440:{jn:"しんせいの霊玉",cn:"新生靈珠"},441:{jn:"しんせいの覇玉",cn:"新生霸珠"},442:{jn:"しんせいの宝玉",cn:"新生寶珠"},
443:{jn:"バギの呪文書",cn:""},500:{jn:"りゅうおう",cn:"龍王"},501:{jn:"竜王",cn:"極龍王"},502:{jn:"デスピサロ",cn:"死亡皮薩羅"},504:{jn:"聖竜ミラクレア",cn:"聖龍米拉柯蕾亞"},505:{jn:"ハーゴン",cn:"哈貢"},506:{jn:"破壊神シドー",cn:"破壞神席德"},507:{jn:"スラン&キャタピン",cn:"史蘭&毛毛蟲"},508:{jn:"バラモス",cn:"巴拉摩斯"},509:{jn:"バラモスブロス",cn:"巴拉摩斯二號"},510:{jn:"クシャラミ",cn:"克夏拉米"},511:{jn:"バルバルー",cn:"巴魯巴魯"},512:{jn:"カカロン",cn:"卡卡隆"},513:{jn:"ドメディ",cn:"德麥狄"},514:{jn:"魔剣士ピサロ",cn:"魔劍士皮薩羅"},515:{jn:"バラモスゾンビ",cn:"殭屍巴拉摩斯"},516:{jn:"オムド・ロレス",cn:"歐姆德・勞萊士"},517:{jn:"ミルドラース",cn:"米爾德拉斯"},
518:{jn:"大魔王ミルドラース",cn:"大魔王米爾德拉斯"},519:{jn:"サイモン＆ホイミン",cn:"サイモン＆霍伊米恩"},520:{jn:"大魔王ゾーマ",cn:"大魔王索瑪"},521:{jn:"闇の大魔王ゾーマ",cn:"黑暗大魔王索瑪"},522:{jn:"神吉ふくぶくろ",cn:"神吉"},523:{jn:"超吉ふくぶくろ",cn:"超吉"},524:{jn:"大吉ふくぶくろ",cn:"大吉"},525:{jn:"中吉ふくぶくろ",cn:"中吉"},526:{jn:"小吉ふくぶくろ",cn:"小吉"},527:{jn:"末吉ふくぶくろ",cn:"末吉"},528:{jn:"ラーミア",cn:"拉米亞"},529:{jn:"不死鳥ラーミア",cn:"不死鳥拉米亞"},530:{jn:"レッドオーブ",cn:"紅色寶珠"},531:{jn:"ブルーオーブ",cn:"藍色寶珠"},532:{jn:"グリーンオーブ",cn:"綠色寶珠"},533:{jn:"パープルオーブ",cn:"紫色寶珠"},534:{jn:"シルバーオーブ",cn:"銀色寶珠"},535:{jn:"イエローオーブ",
cn:"黃色寶珠"},536:{jn:"聖天竜ミラクレア",cn:"聖天龍米拉柯蕾亞"},537:{jn:"デスタムーア",cn:"德斯塔穆亞"},538:{jn:"大魔王デスタムーア",cn:"大魔王德斯塔穆亞"},539:{jn:"マガルギ",cn:"魔迦露姬"},540:{jn:"ムドー",cn:"姆多"},541:{jn:"ゾーマズデビル",cn:"小索瑪惡魔"},542:{jn:"エスターク",cn:"艾斯塔克"},543:{jn:"地獄の帝王エスターク",cn:"地獄帝王艾斯塔克"},544:{jn:"冥王ネルゲル",cn:"冥王內爾格爾"},545:{jn:"冥獸王ネルゲル",cn:"冥獸王內爾格爾"},546:{jn:"勇者まねまね隊",cn:"勇者模仿隊"},547:{jn:"キングスペーディオ",cn:"國王司佩迪奧"},548:{jn:"ディアノーグエース",cn:"迪亞諾古艾斯"},549:{jn:"グラブゾンジャック",cn:"格拉布曾傑克"},550:{jn:"クインガルハート",cn:"奎因加爾哈特"},551:{jn:"ウルスラ",cn:"終極史萊姆"},
552:{jn:"しびれくらげひめ",cn:""},553:{jn:"スライムかがみもち",cn:""},554:{jn:"しびれくらげ",cn:"麻痺水母"},555:{jn:"ゴールデンスライム",cn:"黃金史萊姆"},556:{jn:"デンガー",cn:"史萊姆劍士"},557:{jn:"ホミロン",cn:"霍米隆"},558:{jn:"スライムハーツ",cn:"史萊姆之心"},559:{jn:"ダイヤモンドスライム",cn:"鑽石史萊姆"},560:{jn:"スラリン＆スラみ",cn:"史拉琳&史拉美"},561:{jn:"ミイホン＆ドラお",cn:"米伊霍恩&龍仔"},562:{jn:"ぱぱ＆まま",cn:""},563:{jn:"スライムファミリー",cn:""},564:{jn:"バトミン",cn:""},565:{jn:"プラチナキング",cn:"白金史萊姆王"},566:{jn:"プリンセスライム",cn:""},567:{jn:"クイーンスライム",cn:""},568:{jn:"ドラゴスライム",cn:""},569:{jn:"スライムブレス",cn:""},570:{jn:"ドラゴメタル",
cn:""},571:{jn:"ぶちキング",cn:""},572:{jn:"お祝いホイミン",cn:""},601:{jn:"メラリザード",cn:"美拉蜥蜴"},602:{jn:"ベビーニュート",cn:"幼崽龍"},603:{jn:"ドラゴンキッズ",cn:"迷你龍"},604:{jn:"アックスドラゴン",cn:"戰斧龍"},605:{jn:"ドラゴンソルジャー",cn:"龍傭兵"},606:{jn:"キースドラゴン",cn:"藍龍"},607:{jn:"ダースドラゴン",cn:"赤龍"},608:{jn:"シーバーン",cn:"海雙足飛龍"},609:{jn:"リザードファッツ",cn:"肥蜥蜴"},610:{jn:"シャークマジュ",cn:"鯊龍"},611:{jn:"キングヒドラ",cn:"大王海德拉"},612:{jn:"キングリザード",cn:"王者蜥蜴"},613:{jn:"ドラゴンガイア",cn:"巨龍蓋亞"},614:{jn:"ギガントヒルズ",cn:"巨丘龍"},615:{jn:"ギガントドラゴン",cn:"巨龍"},616:{jn:"テラノバット",cn:"蝠翼龍"},
617:{jn:"ライバーン",cn:"翼龍"},618:{jn:"ライバーンロード",cn:"翼龍王"},619:{jn:"スカイドラゴン",cn:"空龍"},620:{jn:"サラマンダー",cn:"沙羅曼蛇"},621:{jn:"神竜",cn:"神龍"},622:{jn:"聖地竜オリハルゴン",cn:"聖地龍奧利哈爾龍"},623:{jn:"ドランゴ",cn:"德朗哥"},624:{jn:"グランシーザー",cn:"偉大凱薩"},625:{jn:"じげんりゅう",cn:"次元龍"},626:{jn:"ドラゴンライダー",cn:"龍騎士"},627:{jn:"ガーディアン",cn:"守護者"},628:{jn:"デビルドラグナー",cn:"惡魔龍騎兵"},629:{jn:"コアトル",cn:"柯亞特爾"},630:{jn:"シードラゴンズ",cn:""},631:{jn:"魔戦士ルギウス",cn:"魔戰士魯奇烏斯"},632:{jn:"スマイルリザード",cn:"微笑蜥蜴"},633:{jn:"みずたまドラゴン",cn:"水珠龍"},634:{jn:"ファンキードラゴ",cn:"前衛龍"},
635:{jn:"怪獣プスゴン",cn:"普斯貢"},636:{jn:"メタルリザード",cn:"金屬蜥蜴"},637:{jn:"デンデン竜",cn:""},638:{jn:"ドラゴンバゲージ",cn:""},639:{jn:"ボボンガー",cn:""},651:{jn:"ファンキーバード",cn:"前衛怪鳥"},652:{jn:"エグドラシル",cn:"世界之樹"},653:{jn:"デスファレーナ",cn:""},654:{jn:"デビルパピヨン",cn:"惡魔蛾"},655:{jn:"ヒロインガール",cn:"少女主角"},656:{jn:"ファイターガール",cn:"少女戰士"},657:{jn:"マージガール",cn:"少女法師"},658:{jn:"プリストガール",cn:"少女牧師"},659:{jn:"プチットガールズ",cn:"普吉特少女團"},660:{jn:"ヘルバオム",cn:"地獄樹"},661:{jn:"ナスビナーラ",cn:"茄子怪"},662:{jn:"メランザーナ",cn:"美蘭茄子"},663:{jn:"ブルベリーノ",cn:""},664:{jn:"キングマーマン",
cn:"人魚王"},665:{jn:"グレイトマーマン",cn:"大師人魚怪"},666:{jn:"グラコス",cn:"古拉柯斯"},667:{jn:"グレイトマーマン",cn:"沉默獅鷲"},668:{jn:"エビルホーク",cn:"邪惡蒼鷹"},669:{jn:"ジャミラス",cn:"賈米拉斯"},670:{jn:"マリンデュエル",cn:"海洋決鬥士"},671:{jn:"フロストナーガ",cn:"冰霜蛇神"},672:{jn:"ホークマン",cn:"鷹人"},673:{jn:"ガーゴイル",cn:""},674:{jn:"ソードフライヤー",cn:"空中劍豪"},675:{jn:"ロック鳥",cn:"大鵬"},676:{jn:"デスアラウネ",cn:"死亡妖花"},678:{jn:"キラーモス",cn:""},679:{jn:"オーシャンボーン",cn:"海洋始祖"},680:{jn:"だいおうクジラ",cn:"大王鯨魚"},681:{jn:"わかめおうじ",cn:""},682:{jn:"フラワーゾンビ",cn:""},683:{jn:"潮風のディーバ",cn:"海風歌姬"},
684:{jn:"大海の王者",cn:"大海王者"},685:{jn:"海王神",cn:"海王神"},686:{jn:"じんめんじゅ",cn:""},687:{jn:"ウドラー",cn:""},688:{jn:"エビルトレント",cn:"邪惡樹妖"},689:{jn:"魔戦士ホゲイラ",cn:"魔戰士霍蓋拉"},690:{jn:"かっちゅうアリ",cn:""},691:{jn:"げんじかぶと",cn:""},692:{jn:"スカラベキング",cn:""},693:{jn:"レティス",cn:""},694:{jn:"神鳥レティス",cn:""},701:{jn:"マッスルももんじゃ",cn:""},702:{jn:"タウラス",cn:""},703:{jn:"ブレイズホーン",cn:"火紅角怪"},704:{jn:"ストロングアニマル",cn:""},705:{jn:"ヘルジャッカル",cn:""},706:{jn:"スケアリードッグ",cn:"恐懼狗"},707:{jn:"ギュメイ将軍",cn:"魔豹將軍"},708:{jn:"魔剣神レパルド",cn:"魔劍神雷帕爾德"},709:{jn:"トワイライトメア",
cn:"暮光夢獸"},710:{jn:"ウイングタイガー",cn:"翼虎"},711:{jn:"ダークパンサー",cn:"暗黑豹"},712:{jn:"ゲリュオン",cn:"黑斑翼獸"},713:{jn:"れんごく天馬",cn:""},714:{jn:"レジェンドホース",cn:""},715:{jn:"メタルバニー",cn:"金屬兔女郎"},716:{jn:"妖魔ジュリアンテ",cn:"妖魔朱利安提"},717:{jn:"舞踏魔プレシアンナ",cn:"舞踏魔普蕾茜安娜"},718:{jn:"魔戦士ヴェーラ",cn:"魔戰士薇拉"},719:{jn:"モグラの子分",cn:"鼴鼠小弟"},720:{jn:"モグラ盗賊団",cn:"鼴鼠盜賊團"},721:{jn:"ゲルニック将軍",cn:"格爾尼克將軍"},722:{jn:"邪眼皇帝アウルート",cn:"邪眼皇帝奧魯特"},723:{jn:"ゴレオン将軍",cn:""},724:{jn:"怪力軍曹イボイノス",cn:""},751:{jn:"だいまじん",cn:"大魔神"},752:{jn:"てんのもんばん",cn:"天之守門人"},753:{jn:"メタルゴーレム",
cn:"金屬巨像兵"},754:{jn:"ドンガンバ",cn:"稻草騎士"},772:{jn:"プチさまようよろい",cn:""},773:{jn:"プチじごくのよろい",cn:""},774:{jn:"プチキラーアーマー",cn:""},775:{jn:"たてまじん",cn:"盾魔人"},776:{jn:"シールドオーガ",cn:"持盾巨魔"},777:{jn:"オーガキング",cn:"巨魔大王"},778:{jn:"デビルアーマー",cn:"惡魔鎧甲"},779:{jn:"サタンメイル",cn:"魔王鎧甲"},780:{jn:"マジックアーマー",cn:"魔力鎧甲"},781:{jn:"ゆきのじょおう",cn:"雪之女王"},782:{jn:"ドラゴンマシン",cn:"龍機器"},783:{jn:"メタルドラゴン",cn:"黃金龍"},784:{jn:"メカバーン",cn:"機械暴龍"},785:{jn:"ポンコツ兵",cn:"破舊士兵"},786:{jn:"プロトキラー",cn:"原型殺手"},787:{jn:"メタルクラッシャー",cn:"金屬猛將"},788:{jn:"プレゼントぶくろ",
cn:"禮物袋"},789:{jn:"ギフトボックス",cn:"禮物盒"},790:{jn:"シャドー",cn:"陰影"},791:{jn:"ホロゴースト",cn:""},792:{jn:"まおうのかげ",cn:"魔王之影"},793:{jn:"おみくじミミック",cn:"抽籤寶箱"},794:{jn:"炎の戦士",cn:""},795:{jn:"ブリザードマン",cn:""},796:{jn:"ダークファンタズマ",cn:""},797:{jn:"こうてつまじん",cn:"鋼鐵魔人"},798:{jn:"デスマシーン",cn:"死亡機械兵"},799:{jn:"エビルエスターク",cn:"邪惡艾斯塔克"},801:{jn:"バーサーカー",cn:"狂戰士"},802:{jn:"勇者バーサー",cn:"勇者巴薩"},803:{jn:"まじゅつし",cn:"魔術師"},804:{jn:"きとうし",cn:"祈禱師"},805:{jn:"ようじゅつし",cn:"妖術士"},806:{jn:"王女マージュ",cn:"王女瑪吉"},807:{jn:"はらぺこサタン",cn:""},808:{jn:"からあげサタン",
cn:""},809:{jn:"メタルドラキー",cn:"金屬多拉奇"},810:{jn:"妖女イシュダル",cn:"妖女伊修妲爾"},811:{jn:"ヘルヴィーナス",cn:"地獄魔女"},812:{jn:"ハロウィンドラキー",cn:"萬聖節多拉奇"},813:{jn:"パンプキッズ",cn:"南瓜小子"},814:{jn:"パンプキング",cn:"南瓜大王"},815:{jn:"ハッピーハロウィン",cn:"萬聖節快樂"},816:{jn:"シャドーサタン",cn:""},817:{jn:"イズライール",cn:"伊茲賴爾"},818:{jn:"ライオネック",cn:"萊昂涅克"},819:{jn:"ホースデビル",cn:"馬面惡魔"},820:{jn:"メッサーラ",cn:"梅薩拉"},821:{jn:"バルバロッサ",cn:"巴巴羅薩"},822:{jn:"ゴールデンゴーレム",cn:"黃金巨像"},823:{jn:"セルゲイナス",cn:"賽爾蓋納斯"},824:{jn:"サンタモーモン",cn:"聖誕魔萌"},825:{jn:"ハッピークリスマス",cn:"聖誕快樂"},
826:{jn:"ジングルモーモン",cn:"鈴鐺魔萌"},827:{jn:"ごろつき",cn:"無賴漢"},828:{jn:"エリミネーター",cn:""},829:{jn:"デスストーカー",cn:"死亡追蹤者"},830:{jn:"カンダタハニー",cn:"甜蜜甘達坦"},831:{jn:"カンダタシュガー",cn:"砂糖甘達坦"},832:{jn:"カンダタショコラ",cn:"巧克力甘達坦"},833:{jn:"カンダタレディース",cn:"甘達坦少女組"},834:{jn:"カメレオンマン",cn:"變色人"},835:{jn:"きりさきピエロ",cn:"切裂小丑"},836:{jn:"キラージャック",cn:"殺手傑克"},837:{jn:"はめつの使者",cn:"破滅使者"},838:{jn:"アクバー",cn:"阿庫巴"},839:{jn:"デーモンキング",cn:"惡魔之王"},840:{jn:"ランプのまじん",cn:"神燈魔人"},841:{jn:"ランプの魔王",cn:"神燈魔王"},842:{jn:"シールドこぞう",cn:"持盾小鬼"},843:{jn:"ビッグフェイス",
cn:"大臉盾"},844:{jn:"ダークホビット",cn:"暗黑霍比特"},845:{jn:"モーモン",cn:"魔萌"},846:{jn:"ピンクモーモン",cn:"粉紅魔萌"},847:{jn:"マポレーナ",cn:"馬波雷納"},848:{jn:"ジェネラルダンテ",cn:"但丁將軍"},849:{jn:"デビルマスタッシュ",cn:"惡魔鬍鬚"},850:{jn:"メイジドラキー",cn:""},851:{jn:"ゴッドバロン",cn:"神兵男爵"},852:{jn:"ようがんまじん",cn:""},853:{jn:"ピサロナイト",cn:"皮薩羅騎士"},854:{jn:"どろにんぎょう",cn:""},855:{jn:"パペットマン",cn:""},856:{jn:"ゴールデンパペット",cn:"黃金傀儡"},857:{jn:"ひょうがまじん",cn:""},859:{jn:"キラーマシン３",cn:"殺戮機器3"},860:{jn:"ヘビーマジンガ",cn:"重裝魔神"},861:{jn:"ゴールドマジンガ",cn:"黃金魔神"},862:{jn:"ゴールデンボックス",
cn:"黃金寶箱"},863:{jn:"ビッグハット",cn:"大帽子"},864:{jn:"トンブレロ",cn:"墨西哥帽"},865:{jn:"マジカルハット",cn:""},866:{jn:"ハナちゃん",cn:""},867:{jn:"ダーククリスタル",cn:""},868:{jn:"Sキラーマシンライト",cn:"S殺戮機器Light"},869:{jn:"ビッグモアイ",cn:""},870:{jn:"ゴードンヘッド",cn:""},871:{jn:"クラウンヘッド",cn:""},877:{jn:"シルバリオン",cn:""},878:{jn:"サージタウス",cn:""},879:{jn:"スマイルロック",cn:""},880:{jn:"ばくだんいわ",cn:""},881:{jn:"メガザルロック",cn:""},882:{jn:"いどまじん",cn:""},883:{jn:"ホールファントム",cn:""},884:{jn:"デスホール",cn:""},901:{jn:"おおドラキー",cn:"大多拉奇"},902:{jn:"グレドラ",cn:""},903:{jn:"レッサーデーモン",
cn:"下級惡魔"},904:{jn:"ホラーウォーカー",cn:"恐怖行進者"},905:{jn:"ダークサタン",cn:"暗黑撒旦"},906:{jn:"ストーンビースト",cn:""},907:{jn:"ヘルビースト",cn:""},908:{jn:"ウィングデビル",cn:"翼魔"},909:{jn:"ダークアラストル",cn:"暗黑阿拉斯托耳"},910:{jn:"プリーストナイト",cn:"牧師騎士"},911:{jn:"エビルソーサラー",cn:"邪惡魔法師"},912:{jn:"サイコマスター",cn:"精神大師"},913:{jn:"悪魔ザイガス",cn:"惡魔扎依迦斯"},914:{jn:"デスマエストロ",cn:"死亡譜曲家"},915:{jn:"ヘルコンダクター",cn:"地獄指揮"},916:{jn:"アモデウス",cn:"末札特"},917:{jn:"モリーサタン",cn:""},918:{jn:"じごくのマドンナ",cn:""},919:{jn:"イビルキュリア",cn:""},920:{jn:"魔戦士アルゴ",cn:""},951:{jn:"カプリゴン",
cn:"卡布里貢"},952:{jn:"ブラストクロウ",cn:"暴風鴉"},953:{jn:"セバスチャン",cn:"賽巴斯欽"},954:{jn:"妖剣士オーレン",cn:"妖劍士奧連"},955:{jn:"魔戦士サイフォン",cn:""}},skills={"メラ":"美拉","メラミ":"美拉米","メラゾーマ":"美拉佐瑪","メラガイアー":"美拉蓋亞","ギラ":"基拉","ベギラマ":"貝基拉瑪","べギラゴン":"貝基拉格恩","イオ":"伊奧","イオラ":"伊奧拉","イオナズン":"伊奧納曾","ヒャド":"夏德","ヒャダルコ":"夏達爾克","マヒャド":"瑪夏德","バギ":"巴基","バギマ":"巴基瑪","バギクロス":"巴基克羅斯","デイン":"迪恩","ライデイン":"拉伊迪恩","ギガデイン":"基加迪恩","ドルマ":"德爾瑪","ドルクマ":"德爾庫瑪","ドルモーア":"德爾摩爾","ハロウィントリック":"萬聖節惡作劇","サイコキャノン":"錯亂加農炮","ザキ":"札奇","ザラキ":"札拉奇","プチマダンテ":"小瑪達恩特","マダンテ":"瑪達恩特",
"ザラキーマ":"扎拉奇瑪","ホイミ":"霍伊米","ベホイミ":"貝霍伊米","ベホマラー":"貝霍瑪拉","ザオラル":"扎奧拉爾","ザオリク":"札奧里庫","キアリー":"奇阿裡","ハロウィントリート":"萬聖節點心","マホヤル":"瑪霍亞魯","ベホマズン":"貝霍瑪曾","バイキルト":"巴依奇爾托","スカラ":"斯卡拉","スクルト":"斯庫爾托","ピオラ":"比奧拉","ピオリム":"比奧利姆","マホカンタ":"瑪霍卡恩塔","フバーハ":"福巴哈","バーハ":"巴哈","マジックバリア":"魔法屏障","バイシオン":"巴爾希奧恩","マインドバリア":"精神屏障","魔力かくせい":"魔力覺醒","パルプンギフト":"帕魯朋禮","インテラ":"伊恩特拉","マホターン":"瑪霍塔恩","ルカニ":"魯卡尼","ルカナン":"魯卡南","ボミエ":"波米埃","ボミオス":"波米奧斯","ラリホー":"拉裡霍","ラリホーマ":"拉裡霍瑪","マヌーサ":"瑪努撒","メダパニ":"美達帕尼","マホトム":"瑪霍托姆","マホトーン":"瑪霍托恩",
"メダパーニャ":"美達帕尼亞","ぐるぐるキャンディ":"滾動糖果","くらくらクラッカー":"眩暈拉炮","マホトラ":"瑪霍托拉","スライム斬り":"史萊姆斬","ドラゴン斬り":"龍斬","しぜん斬り":"自然斬","まじゅう斬り":"魔獸斬","ぶっしつ斬り":"物質斬","あくま斬り":"惡魔斬","ゾンビ斬り":"殭屍斬","いなずま斬り":"閃電斬","火炎斬り":"火炎斬","ひょうけつ斬り":"冰結斬","ホーリーエッジ":"神聖之刃","らいじん斬り":"雷神斬","ふうじん斬り":"風神斬","はやぶさ斬り":"隼斬","Vスラッシュ":"Vスラッシュ","魔神斬り":"魔神斬","メタル斬り":"金屬斬","いあい斬り":"居合斬","ダークマッシャー":"黑暗粉碎","れんごく斬り":"煉獄斬","ダークスパイク":"黑暗突刺","ブリザーラッシュ":"暴雪衝擊","しんくう斬り":"真空斬","もろば斬り":"舍生斬","れっぱ斬り":"裂發斬","ふたり攻撃":"雙人攻擊","ばくれん斬り":"爆煉斬","抜刀さみだれ斬り":"拔刀亂斬","にゃんたまアタック":"喵球衝擊",
"マーシャルニャーツ":"喵元帥","ジゴスラッシュ":"地獄斬","神速の剣技":"神速劍技","ホーリーラッシュ":"神聖衝擊","つきとばし":"撞飛","大魔神斬り":"大魔神斬","こんしん斬り":"渾身斬","しっぷうのキバ":"しっぷうのキバ","たたきつぶし":"擊碎","ギガスラッシュ":"光刃斬","スライダークロー":"スライダークロー","メタルむそう":"金屬無雙","聖魔斬":"聖魔斬","双竜打ち":"雙龍打","ミラクルソード":"奇蹟劍技","しっぷうづき":"疾風突刺","吸血":"吸血","帝王の一閃":"帝王一閃","紅蓮斬":"紅蓮斬","リーフスラッシュ":"リーフスラッシュ","冥王の大鎌":"冥王大鎌","パンサークロー":"豹爪","しっぷうのキバ":"疾風之牙","かぶとわり":"裂盔斬","マヌーサ斬り":"瑪努撒斬","もうどく斬り":"猛毒斬","メダパニ斬り":"美達帕尼斬","だつりょく斬り":"脫力斬","どく攻撃":"毒性攻擊","ねむり攻撃":"睡眠攻擊","マヒ攻撃":"麻痺攻擊","大地の怒り":"大地之怒","アサシンアタック":"刺客突襲",
"ネクロゴンドの波動":"奈克羅剛鐸的波動","やいばくだき":"斷刃","キングダムソード":"王國之劍","にくきゅうパンチ":"肉球拳","テールハンマー":"尾部重錘","まどろみ斬り":"淺眠斬","よろいくだき":"鎧甲碎擊","ポイズンブレード":"毒刃","まふうじのまい":"まふうじのまい","ダークウィップ":"暗黑鞭","漆黒のツメ":"漆黑之爪","マヒャド斬り":"瑪夏德斬","ボミオスブレード":"波米奧斯劍","びっくりランタン":"驚嚇提燈","マジックブレイク":"魔法之劍","ランドインパクト":"大地衝擊","シャインスコール":"光之暴雨","はげしいビンタ":"大巴掌","メッタ斬り":"亂砍","ブレスブレイク":"吐息打擊","スノーラッシュ":"冰雪強擊","くらげのまい":"くらげのまい","かみくだき":"咬碎","しばり打ち":"束縛打","ソードクラッシュ":"刀劍碎擊","ディバインスペル":"神聖咒文","海魔神の怒り":"海魔神之怒","武器ふりまわし":"揮舞武器","恐怖のツメ":"恐怖之爪","蒼天魔斬":"蒼天魔斬",
"ブレスクラッシュ":"吐息碎擊","はげしいきりさき":"猛切","シールドブレイク":"盾碎","デモンズソード":"惡魔劍技","いなずま":"閃電","かまいたち":"鎌鼬","ばくれつけん":"爆裂拳","みなごろし":"屠戮","おにび":"鬼火","しんくうは":"真空波","てっぽう水":"水槍","スラ・キャノン":"史拉・加農","スラ・バースト":"史拉・爆破","マデュラビーム":"赤光射線","Vコンボ":"Vコンボ","たいあたり":"衝撞","ジゴスパーク":"地獄雷打","ほうでん":"放電","じひびき":"地鳴","水しぶき":"水花","いわなげ":"扔石頭","閃光烈火拳":"閃光烈火拳","サンダーボルト":"雷電射擊","流星":"流星","パペットシャワー":"パペットシャワー","トルネード":"龍捲風","スラ・ストライク":"スラ・ストライク","スライムシャワー":"スライムシャワー","ミラクルストライク":"ミラクルストライク","メイルストロム":"漩渦","魔瘴弾":"魔瘴彈","獣王げきれつしょう":"獸王激烈掌","めいそう":"冥想",
"やくそうレイン":"藥草之雨","ホイミン音頭":"霍伊米恩舞曲","光のはどう":"光のはどう","光の洗礼":"光之洗禮","ゴスペルソング":"福音之歌","フワフワダンス":"軟綿綿之舞","天使のうたごえ":"天使のうたごえ","せかいじゅの葉":"せかいじゅの葉","せかいじゅのしずく":"世界樹之露","ゴロゴロ":"打滾","聖女のうた":"聖女之歌","おたけび":"吼叫","はげしいおたけび":"猛烈吼叫","せいじゃくの光":"寂靜之光","まぶしい光":"刺目之光","なめまわし":"四處亂舔","Vジャンプ":"Vジャンプ","ぶきみな光":"詭異之光","すなけむり":"沙塵","ピンクタイフーン":"粉紅颱風","ジングルベル":"鈴兒響叮噹","やみのはどう":"暗之波動","あやしいひとみ":"詭異的眼神","まがまがしい光":"不祥之光","スラ・フラッシュ":"スラ・フラッシュ","コミックソング":"コミックソング","潮風のララバイ":"海風搖籃曲","冥界の門":"冥界之門","冥府の縛鎖":"冥府的束縛","マジカル☆ポシェット":"魔法☆包裹",
"テンプテーション":"魅惑之風","あやつる":"操控","だいぼうぎょ":"大防禦","いてつく眼光":"凍結視線","いてつくはどう":"凍結波動","封印の霧":"封印之霧","火の息":"火之氣息","火炎の息":"火焰氣息","はげしい炎":"烈焰","つめたい息":"寒冷氣息","こおりの息":"冰結氣息","こごえる吹雪":"冰凍暴風雪","しゃくねつ":"灼熱","やみのブレス":"暗之吐息","かがやく息":"閃耀氣息","れんごく火球":"煉獄火球","しゃくねつ火球":"灼熱火球","ひかりのブレス":"光之吐息","白くかがやく光":"輝耀之光","デスファイア":"死亡烈焰","黒くかがやく闇":"輝耀之暗","あまい息":"甜蜜氣息","どくの息":"毒之氣息","もうどくの息":"猛毒氣息","やけつく息":"灼燒氣息","まどいの息":"迷惑氣息","アシッドブレス":"酸蝕吐息","暗黒の瘴気":"暗黑的瘴氣","呪いのきり":"詛咒之霧","ダークブレス":"黑暗吐息","息をすいこむ":"吸氣","メダパニダンス":"美達帕尼之舞","マホトラ踊り":"瑪霍托拉之舞",
"ファンキーダンス":"前衛舞蹈","ぱふぱふ":"啪嘸啪嘸","さそう踊り":"誘惑之舞","チャームウィップ":"魅惑之鞭","くちふうじ踊り":"くちふうじ踊り","魅惑のまなざし":"魅惑的凝視","おいかぜ":"逆轉之風","みがわり":"替身","ちからため":"蓄力","竜眼":"龍眼","みかわしきゃく":"閃避步法","におうだち":"仁王立","ビッグシールド":"ビッグシールド","きあいため":"蓄力","大地の守り":"大地守護","星天の守り":"星天守護","覚醒モード":"覚醒モード","マッスルポーズ":"健美姿勢","メイクアップ":"メイクアップ","斬撃よそく":"斬擊預測","ぎゃくふう":"逆風","たたかいのうた":"戰鬥之歌","完全覚醒":"完全覚醒","まりょくのうた":"まりょくのうた","スラ・フィーバ":"史萊姆狂熱","フェザーストーム":"羽翼風暴","つるぎのまい":"劍舞","うちわのまい":"團扇之舞","ハッスルダンス":"喧鬧之舞","タップダンス":"踢踏舞"},characteristics={"ときどきピオラ":"偶發比奧拉",
"ときどきバイキルト":"偶發巴依奇爾托","ときどきインテ":"偶發伊恩特","ときどきマインドバリア":"偶發精神屏障","ときどきスカラ":"偶發斯卡拉","ときどきみかわしきゃく":"偶發閃避步法","いきなりインテ":"突發伊恩特","いきなりマインドバリア":"突發精神屏障","いきなりバーハ":"突發巴哈","つねにマインドバリア":"常時精神屏障","メラ系のコツ":"美拉的訣竅","ヒャド系のコツ":"夏德的訣竅","ギラ系のコツ":"基拉的訣竅","バギ系のコツ":"巴基的訣竅","イオ系のコツ":"伊奧的訣竅","デイン系のコツ":"迪恩的訣竅","ドルマ系のコツ":"德爾瑪的訣竅","回復のコツ":"回復的訣竅","呪文会心出やすい":"咒文容易出現會心一擊","会心出やすい":"容易出現會心一擊","ひん死で会心":"瀕死時發動會心一擊","ひん死でみかわし":"瀕死時發動會心一擊","ひん死で呪文会心でやすい":"瀕死時咒文容易出現會心一擊","みかわしアップ":"閃避上升","メタルボディ":"金屬身體","ライトメタルボディ":"輕金屬身體","やみのころも":"暗之披風",
"魔戦士の誇り":"魔戰士的驕傲","亡者の執念":"亡者的韌性","秘めたるチカラ":"神秘力量","神獣の加護":"神獸的加護"},equipments={"いなずまの剣":"閃電之劍","しっぷうのレイピア":"","ほのおのつるぎ":"火焰劍","じごくのサーベル":"地獄軍刀","誘惑の剣":"","まどろみの剣":"","はじゃのつるぎ":"","ゾンビキラー":"","Sマシンソード":"S機械劍","レイピア":"細劍","ドラゴンキラー":"斬龍劍","てつのつるぎ":"鐵劍","魔神のかなづち":"","キングアックス":"","冥王大鎌":"冥王大鐮","ふぶきのオノ":"風雪之斧","ムーンアックス":"","おおかなづち":"大槌","プチットハンマー":"","斬魔刀":"斬魔刀","バトルアックス":"戰斧","きょだいスパナ":"兄弟扳手","てつのオノ":"","グラコスのヤリ":"","コアトルのヤリ":"","いなずまのやり":"閃電之矛","パルチザン":"","ダークランス":"","さじんのやり":"","バトルフォーク":"戰叉","ロングスピア":"長矛",
"ホーリーランス":"神聖之矛","てつのやり":"","ドラゴンクロー":"龍爪","サンダークロー":"","ドリルナックル":"","スライダークアーム":"","はやぶさのツメ":"隼爪","てっこうかぎ":"手甲鉤","まよけのつめ":"","てつのツメ":"","聖騎士の盾":"","まほうの盾":"","オーガシールド":"","大おやぶんの盾":"","メタスラトレイ":"","ダークシールド":"暗黑盾","ふうじんの盾":"","ルーンバックラー":"","こおりの盾":"","ほのおの盾":"炎之盾","タマゴロントレイ":"","スライムトレイ":"史萊姆托盤","ホワイトシールド":"","てつの盾":"","クリスマスステッキ":"","賢者の杖":"","ハロウィンステッキ":"","いかずちの杖":"","しゅくふくの杖":"祝福之杖","バトミンマイク":"","おおめだまの杖":"","マグマの杖":"","うみなりの杖":"海鳴法杖","モーモンスティック":"魔萌短杖","さばきの杖":"制裁法杖","まどうしのつえ":"","げんませき":"幻魔石",
"天使のソーマ":"天使的神酒","ヘビーメタル":"重金屬","とうこんエキス":"鬥魂精華","あまつゆのいと":"雨露之絲","せいれいせき":"精靈石","ほしのカケラ":"星之碎片","さえずりのみつ":"天籟之蜜","ルビーのげんせき":"紅寶石的原石","みかわしそう":"閃避草","みがきずな":"研磨砂","まじゅうの皮":"魔獸原皮","まじゅうのツノ":"魔獸原角","まりょくの土":"魔力之土","ちょうのはね":"蝴蝶翅膀","するどいキバ":"利齒","てつのくぎ":"鐵制釘子","つけもの石":"醃菜石","へびのぬけがら":"蛇蛻","ドラゴンのツノ":""},dqmsl_jpn_org={"パワーアップさせる":"合星","メラ　　　：":"美拉　　　：","ヒャド　　：":"夏德　　　：","ギラ　　　：":"基拉　　　：","バギ　　　：":"巴基　　　：","イオ　　　：":"伊奧　　　：","デイン　　：":"迪恩　　　：","ドルマ　　：":"德爾瑪　　：","ザキ　　　：":"札奇　　　：","マヌーサ　：":"瑪努撒　　：","マホトーン：":"瑪霍托恩　：",
"毒　　　　：":"毒　　　　：","ねむり　　：":"睡眠　　　：","こんらん　：":"混亂　　　：","マヒ　　　：":"麻痺　　　：","息封じ　　：":"氣息封印　："};RegExp.escape=function(a){return(a+"").replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1")};function isSubstring(a,b){for(var c in b)if(0<=b[c].indexOf(a))return!0;return!1}
var names={},accessors=[{source:others,jn:function(a){return a},cn:function(a){return others[a]}},{source:monsters,jn:function(a){return monsters[a].jn},cn:function(a){return monsters[a].cn}},{source:skills,jn:function(a){return a},cn:function(a){return skills[a]}},{source:characteristics,jn:function(a){return a},cn:function(a){return characteristics[a]}},{source:equipments,jn:function(a){return a},cn:function(a){return equipments[a]}},{source:dqmsl_jpn_org,jn:function(a){return a},cn:function(a){return dqmsl_jpn_org[a]}}],
i;for(i in accessors){var accessor=accessors[i],key;for(key in accessor.source){var jn=accessor.jn(key),cn=accessor.cn(key);0<cn.length&&(names[RegExp.escape(jn)]=cn)}}var keys=Object.keys(names).sort(function(a,b){return a.length<b.length?1:a.length>b.length?-1:a.localeCompare(b)}),groups=[keys];
function replace(a){if("undefined"==typeof a||null==a||0<=$.inArray(a,exceptions))return a;for(var b in groups){var c=new RegExp(groups[b].join("|"),"g");a=a.replace(c,function(a){return names[RegExp.escape(a)]})}return a}function subst(){var a=$("body").find(":not(iframe)").addBack().contents().filter(function(){return 3==this.nodeType}),b;for(b in a){var c=a[b];c.nodeValue=replace(c.nodeValue)}}window.top==window.self&&$(subst);
